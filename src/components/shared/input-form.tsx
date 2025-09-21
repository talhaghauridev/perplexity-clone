import React, { forwardRef, memo, useMemo } from 'react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { PasswordInput } from '../ui/password-input';

const FormContext = React.createContext<{
  control: Control<any> | null;
}>({
  control: null,
});

interface InputFormProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<typeof Input>, 'error'> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  inputClassName?: string;
  renderInput?: (props: {
    field: {
      onChange: (...event: any[]) => void;
      onBlur: () => void;
      value: any;
    };
    fieldState: {
      invalid: boolean;
      isTouched: boolean;
      isDirty: boolean;
      error?: {
        type: string;
        message?: string;
      };
    };
  }) => React.ReactElement;
}

const variants = {
  visible: { opacity: 1, height: 'auto', marginTop: 6 },
  hidden: { opacity: 0, height: 0, marginTop: 0 },
};

const AnimatedFormMessage = ({ fieldState }: { fieldState: any }) => {
  const isError = useMemo(
    () => fieldState.error && fieldState.error?.message,
    [fieldState.error?.message]
  );
  return (
    <div>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isError ? 'visible' : 'hidden'}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
        style={{
          overflow: 'hidden',
        }}>
        <FormMessage className="text-[12px]" />
      </motion.div>
    </div>
  );
};

function InputFormInner<TFieldValues extends FieldValues>(
  {
    control: controlProp,
    name,
    renderInput,
    label,
    className,
    type,
    inputClassName,
    ...inputProps
  }: InputFormProps<TFieldValues>,
  ref: React.ForwardedRef<React.ElementRef<typeof Input>>
) {
  const context = useFormContext();
  const control = controlProp || context.control;

  if (!control) {
    throw new Error(
      'InputForm must be used within a Form component or have a control prop provided.'
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ...rest }, fieldState }) =>
        renderInput ? (
          renderInput({
            field: { onChange, onBlur, value, ...rest },
            fieldState,
          })
        ) : (
          <FormItem className={cn(`gap-0`, className)}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <FormControl>
              {type === 'password' ? (
                <PasswordInput
                  containerClassName="mt-2"
                  className={cn('focus-visible:ring-[1.4px]', inputClassName)}
                  ref={ref}
                  id={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  {...inputProps}
                />
              ) : (
                <Input
                  className={cn('mt-2 focus-visible:ring-[1.4px]', inputClassName)}
                  ref={ref}
                  id={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  {...inputProps}
                />
              )}
            </FormControl>
            <AnimatedFormMessage fieldState={fieldState} />
          </FormItem>
        )
      }
    />
  );
}

const FormInput = memo(forwardRef(InputFormInner)) as <TFieldValues extends FieldValues>(
  props: InputFormProps<TFieldValues> & {
    ref?: React.ForwardedRef<React.ElementRef<typeof Input>>;
  }
) => React.ReactElement;

export { FormContext, FormInput };
