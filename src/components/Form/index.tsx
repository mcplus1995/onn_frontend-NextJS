import { ChangeEvent, FC, HTMLAttributes } from "react";

import { capitalizeFirstLetterOfEveryWord } from "@/utils/stringUtils";
import clsx from "clsx";

type FieldProps = HTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  value: string;
  small?: boolean;
  slim?: boolean;
};

export const Field: FC<FieldProps> = ({
  name,
  label,
  small,
  slim,
  onChange,
  value,
  className,
  ...other
}) => {
  const classes = clsx("input", className, {
    "is-small": small,
  });
  const field = (
    <input
      className={classes}
      type="text"
      placeholder=""
      defaultValue={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        onChange && onChange({ [name]: e.currentTarget.value });
      }}
      {...other}
    />
  );

  if (slim) {
    return field;
  }

  return (
    <label className="label mb-5">
      <h6 className="mb-3">{label || name}</h6>
      {field}
    </label>
  );
};

type ButtonFieldProps = HTMLAttributes<HTMLInputElement> &
  FieldProps & {
    options: { label: string; value: string }[];
    transformer: (value: string) => string;
    onChange: (value: { [key: string]: string | null }) => void;
  };

export const ButtonField: FC<ButtonFieldProps> = ({
  name,
  label,
  slim,
  options,
  value,
  onChange,
  transformer,
}) => {
  // Ensure options is an array, otherwise transform it into array of [value, label] pairs
  const opts = Array.isArray(options) ? options : Object.entries(options);

  const buttons = (
    <div className="buttons">
      {opts.map((option) => {
        const [opVal, opLabel] = Array.isArray(option)
          ? option
          : [option.value, option.label];
        const finalLabel = transformer
          ? transformer(
              capitalizeFirstLetterOfEveryWord(String(opLabel || opVal))
            )
          : capitalizeFirstLetterOfEveryWord(String(opLabel || opVal));

        return (
          <button
            key={opVal}
            className={
              "button is-size-7 is-rounded is-primary" +
              (opVal === value ? "is-link" : "")
            }
            onClick={() => onChange({ [name]: value === opVal ? null : opVal })}
          >
            {finalLabel}
          </button>
        );
      })}
    </div>
  );

  if (slim) {
    return buttons;
  }

  return (
    <>
      <label className="label mb-5">
        <h6 className="mb-3">{label || name}</h6>
        {buttons}
      </label>
    </>
  );
};
