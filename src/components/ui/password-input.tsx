'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PasswordInputProps = React.ComponentProps<'input'> & {
  containerClassName?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const disabled = React.useMemo(
      () => props.value === '' || props.value === undefined || props.disabled,
      [props.value, props.disabled]
    );

    return (
      <div
        className={cn('relative', containerClassName)}
        data-show-password={showPassword}
        data-disabled={disabled}>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-0 right-0 h-full px-3 py-2 hover:!bg-transparent"
          onClick={() => setShowPassword(prev => !prev)}
          disabled={disabled}
          data-show-password={showPassword}
          data-disabled={disabled}>
          <EyeIcon
            className="hidden h-4 w-4 data-[show-password=true]:data-[disabled=false]:block"
            aria-hidden="true"
            data-show-password={showPassword}
            data-disabled={disabled}
          />
          <EyeOffIcon
            className="block h-4 w-4 data-[show-password=true]:data-[disabled=false]:hidden"
            aria-hidden="true"
            data-show-password={showPassword}
            data-disabled={disabled}
          />
          <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
