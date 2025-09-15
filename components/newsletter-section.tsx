'use client';

import { useState } from 'react';
import { submitNewsletterForm } from '@/app/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // bot trap
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot !== '') return; // bot detected

    const trimmed = email.trim();
    setSuccess(null);
    setError(null);

    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      // Expecting { success: boolean, message?: string }
      const result = await submitNewsletterForm({ 'your-email': trimmed });

      if (result?.success) {
        setSuccess(result.message || 'Subscribed! Thank you.');
        setEmail('');
      } else {
        setError(result?.message || 'Subscription failed. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='relative pb-32'>
      <div className='mx-auto px-6 container'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 blur-3xl'></div>
            <div className='relative bg-white/5 backdrop-blur-xl p-16 border border-white/10 rounded-3xl'>
              <h2 className='mb-6 font-black text-5xl'>
                STAY IN THE
                <br />
                <span className='bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent'>
                  LOOP
                </span>
              </h2>
              <p className='mx-auto mb-12 max-w-2xl text-white/70 text-xl'>
                Get exclusive insights on design, development, and the future of
                digital experiences.
              </p>

              <form
                onSubmit={onSubmit}
                noValidate
                className='flex sm:flex-row flex-col gap-4 mx-auto max-w-md'>
                <Input
                  type='email'
                  placeholder='your@email.com'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className='bg-white/10 backdrop-blur-xl px-6 py-4 border-white/20 rounded-2xl text-white placeholder:text-white/50'
                  aria-label='Email address'
                />

                {/* Honeypot (hidden from users & screenreaders) */}
                <Input
                  type='text'
                  name='_hp'
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className='hidden'
                  tabIndex={-1}
                  autoComplete='off'
                  aria-hidden='true'
                />

                <Button
                  type='submit'
                  disabled={submitting}
                  aria-disabled={submitting}
                  aria-busy={submitting}
                  className='bg-gradient-to-r from-purple-600 hover:from-purple-700 to-cyan-600 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold'>
                  {submitting ? (
                    'Subscribing…'
                  ) : (
                    <>
                      <Send className='mr-2 w-4 h-4' />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>

              <div className='mt-4 min-h-[1.25rem]' aria-live='polite'>
                {success && <p className='text-green-500'>{success}</p>}
                {error && <p className='text-red-500'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
