export type ScalarCodec<T, S> = {
  decode: (v: S) => T;
  encode: (v: T) => S;
  type: string;
};

export const createCodec = <T, S>(def: ScalarCodec<T, S>): ScalarCodec<T, S> => def;

export function date(): ScalarCodec<Date, string> {
  return createCodec<Date, string>({
    decode: (dateStr) => {
      const [y, m, d] = dateStr
        .slice(0, 10)
        .split("-")
        .map((i) => Number(i));
      return new Date(y, m - 1, d);
    },
    encode: (date) => date.toISOString().slice(0, 10),
    type: "Date",
  });
}

export function dateTime(): ScalarCodec<Date, string> {
  return createCodec<Date, string>({
    decode: (dateTimeStr) => new Date(dateTimeStr),
    encode: (date) => date.toISOString(),
    type: "Date",
  });
}

export function ident<T, I = T>(type: string): ScalarCodec<T, I> {
  return {
    decode: (v) => v as any as T,
    encode: (v) => v as any as I,
    type,
  };
}

export function json<T>(type: string): ScalarCodec<T, any>;
export function json(): ScalarCodec<Record<string, any>, any>;
export function json<T = Record<string, any>>(type?: string) {
  return createCodec<T, any>({
    decode: (v) => v,
    encode: (v) => v,
    type: type || "Record<string, any>",
  });
}

export function jsonSerialized<T>(type: string): ScalarCodec<T, string>;
export function jsonSerialized(): ScalarCodec<Record<string, any>, string>;
export function jsonSerialized<T = Record<string, any>>(type?: string) {
  return createCodec<T, string>({
    decode: (v) => JSON.parse(v),
    encode: (v) => JSON.stringify(v),
    type: type || "Record<string, any>",
  });
}

export function time(): ScalarCodec<Date, string> {
  return createCodec<Date, string>({
    decode: (timeStr) => {
      const nw = new Date();
      const mt = timeStr.match(/^(\d{2}):(\d{2}):?(\d{2})?\.?/);
      const [h, m, s, ms] = mt
        ? [mt[1] || "0", mt[2] || "0", mt[3] || "0", mt[4] || "0"].map((x) => Number(x))
        : [0, 0, 0, 0];

      return new Date(nw.getFullYear(), nw.getMonth(), nw.getDate(), h, m, s, ms);
    },
    encode: (date) => date.toISOString().slice(11, 23),
    type: "Date",
  });
}
