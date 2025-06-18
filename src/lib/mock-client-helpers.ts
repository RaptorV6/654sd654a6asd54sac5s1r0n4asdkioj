import { FieldsSelection } from "~/iris";

export type DefineMockClient<
  Q extends Record<string, FieldDescriptor> | undefined,
  M extends Record<string, FieldDescriptor> | undefined,
> = { query: Q; mutation: M };

export function createMockGqlClient<
  Client extends {
    mutation: Record<string, FieldDescriptor> | undefined;
    query: Record<string, FieldDescriptor> | undefined;
  },
>(fields: CreateMockClientOptions<Client>): (env: any) => CreateMockClientResponse<Client> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (env: any) => {
    const _client: Record<string, any> = {};

    if ("mutation" in fields) {
      _client.mutation = (request: any) => mockHandlersImplementation(request, fields.mutation);
    }
    if ("query" in fields) {
      _client.query = (request: any) => mockHandlersImplementation(request, fields.query);
    }
    return _client as CreateMockClientResponse<Client>;
  };
}

type CsvColumns<C extends string> = Record<C, string>;

export function splitCsv(src: string): string[][];
export function splitCsv(src: string, separator: string): string[][];
export function splitCsv<C extends string>(src: string, columns: readonly C[]): CsvColumns<C>[];
export function splitCsv<C extends string>(src: string, columns: readonly C[], separator: string): CsvColumns<C>[];
export function splitCsv<C extends string>(
  src: string,
  _columnsOrSeparator?: readonly C[] | string,
  _separator?: string,
): unknown {
  let separator: string = ";";
  let columns: readonly C[] | undefined = undefined;

  if (_separator != null) {
    separator = _separator;
    columns = _columnsOrSeparator as readonly C[];
  } else if (_columnsOrSeparator != null) {
    if (typeof _columnsOrSeparator === "string") {
      separator = _columnsOrSeparator;
    } else {
      columns = _columnsOrSeparator;
    }
  }

  const dataColsSet: string[][] = src
    .split("\n")
    .filter((rt) => !!rt) // skip empty rows
    .map((row) => row.split(separator));
  if (!columns) return dataColsSet;
  if (dataColsSet.length === 0) return [];
  if (dataColsSet[0].length !== columns.length) {
    throw new Error("splitCsv data columns no equal with columns definition.");
  }
  return dataColsSet.map((cols) => Object.fromEntries(cols.map((cv, idx) => [columns[idx], cv])));
}

//----------------------------------------------------------------------------------------------------------------------
//
// @internal
//
//----------------------------------------------------------------------------------------------------------------------

async function mockHandlersImplementation<
  Query extends Record<string, any>,
  Selection extends Anify<Query>,
  R extends Selection,
>(
  request: { __name?: string } & R,
  fieldsImplementation: FieldsImplementation<Query, Selection>,
): Promise<FieldsSelection<Query, R>> {
  const isPromise = (x: unknown): x is Promise<any> =>
    !!x && typeof x === "object" && "then" in x && typeof x.then === "function";

  const kvp: [any, any][] = await Promise.all(
    Object.entries(request)
      .map(([key, req]) => {
        if (key === "_name") return null;
        const handler = fieldsImplementation[key as Extract<keyof Query, string>];
        return new Promise((resolve, reject) => {
          try {
            const res = handler(req.__args);
            if (isPromise(res)) {
              res.then((v) => resolve([key, v])).catch(reject);
            } else {
              resolve([key, res]);
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .filter((x): x is Promise<[any, any]> => x !== null),
  );
  return Object.fromEntries(kvp);
}

type CreateMockClientOptions<
  Client extends {
    mutation?: Record<string, FieldDescriptor> | undefined;
    query?: Record<string, FieldDescriptor> | undefined;
  },
> = (Client["mutation"] extends Record<string, FieldDescriptor>
  ? { mutation: FieldsImplementation<EQ<Client["mutation"]>, ES<Client["mutation"]>> }
  : {}) &
  (Client["query"] extends Record<string, FieldDescriptor>
    ? { query: FieldsImplementation<EQ<Client["query"]>, ES<Client["query"]>> }
    : {});

type CreateMockClientResponse<
  Client extends {
    mutation?: Record<string, FieldDescriptor> | undefined;
    query?: Record<string, FieldDescriptor> | undefined;
  },
> = (Client["mutation"] extends Record<string, FieldDescriptor>
  ? {
      mutation: <R extends ES<Client["mutation"]>>(
        request: { __name?: string } & R,
      ) => Promise<LocalFieldsSelection<EQ<Client["mutation"]>, R>>;
    }
  : {}) &
  (Client["query"] extends Record<string, FieldDescriptor>
    ? {
        query: <R extends ES<Client["query"]>>(
          request: { __name?: string } & R,
        ) => Promise<LocalFieldsSelection<EQ<Client["query"]>, R>>;
      }
    : {});

type LocalFieldsSelection<A extends Anify<R>, R extends Record<string, any>> = FieldsSelection<A, R>;

type DecrementDepth = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8];
type MakeSelection<T, Depth extends number = 8> = Depth extends never
  ? {}
  : T extends boolean | Date | number | string
    ? {}
    : T extends any[]
      ? MakeSelection<T[number], DecrementDepth[Depth]>
      : T extends Record<string, any>
        ? Partial<MakeSelectionFields<T, Depth>>
        : {};

type MakeSelectionFields<T, Depth extends number> = {
  [K in keyof T]?: T[K] extends any[]
    ? MakeSelectionFields<T[K][number], DecrementDepth[Depth]>
    : T[K] extends Record<string, any>
      ? MakeSelectionFields<T[K], DecrementDepth[Depth]>
      : boolean;
};

type FieldsImplementation<Query extends Record<string, any>, Selection extends Anify<Query>> = {
  [K in Extract<keyof Query, string>]: (req: NonNullable<Selection[K]>["__args"]) => Awaitable<Query[K]>;
};
type Awaitable<T> = Promise<T> | T;
type Anify<T extends Record<string, any>> = { [P in Extract<keyof T, string>]?: any };

type EQ<T extends Record<string, FieldDescriptor>> = {
  [K in keyof T]: T[K][1];
};
type ES<T extends Record<string, FieldDescriptor>> = {
  [K in keyof T]?: MakeSelection<NonNullable<T[K][1]>> & (T[K][0] extends undefined ? {} : { __args: T[K][0] });
};
type FieldDescriptor = [undefined | Record<string, any>, any];
