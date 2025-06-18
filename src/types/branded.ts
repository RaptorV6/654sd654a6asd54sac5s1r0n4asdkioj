declare const __brand: unique symbol;

export type Branded<Type, TagName extends PropertyKey, TagMetadata = never> = Brand<TagName, TagMetadata> & Type;
export type UnwrapBranded<BrandedType extends Brand<PropertyKey, any>> = RemoveAllTags<BrandedType>;
export type GetBrandMetadata<
  Type extends Brand<BrandName, unknown>,
  BrandName extends PropertyKey,
> = Type[typeof __brand][BrandName];

type BrandContainer<Token> = {
  readonly [__brand]: Token;
};

type Brand<Token extends PropertyKey, TagMetadata> = BrandContainer<{ [K in Token]: TagMetadata }>;

type RemoveAllTags<T> =
  T extends Brand<PropertyKey, any>
    ? {
        [ThisTag in keyof T[typeof __brand]]: T extends Branded<infer Type, ThisTag, T[typeof __brand][ThisTag]>
          ? RemoveAllTags<Type>
          : never;
      }[keyof T[typeof __brand]]
    : T;
