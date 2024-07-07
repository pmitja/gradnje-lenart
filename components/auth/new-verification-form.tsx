'use client';

import { CardWrapper } from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('Token is required!');
      return;
    }
    newVerification(token)
      .then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verify your email">
      <div className="flex items-center w-full justify-center flex-col gap-4">
        {!success && !error && <BeatLoader color="#2563EB" />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
