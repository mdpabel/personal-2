'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { submitContactForm } from './action';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot !== '') return; // Bot detected

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const formData = {
      'your-name': name,
      'your-email': email,
      'your-subject': subject,
      'your-message': message,
    };

    const result = await submitContactForm(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setError(result.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className='bg-white/5 backdrop-blur-xl p-8 border border-white/10 rounded-3xl'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Input
          placeholder='Your Name'
          className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type='email'
          placeholder='Your Email'
          className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder='Subject'
          className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <Textarea
          placeholder='Your Message'
          className='bg-white/10 border-white/20 min-h-[150px] text-white placeholder:text-white/50'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* Honeypot field */}
        <Input
          type='text'
          name='_hp'
          className='hidden'
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete='off'
        />
        <Button
          type='submit'
          disabled={isSubmitting}
          className='bg-gradient-to-r from-purple-600 hover:from-purple-700 to-cyan-600 hover:to-cyan-700 w-full'>
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Send className='mr-2 w-4 h-4' /> Send Message
            </>
          )}
        </Button>
      </form>
      {success && (
        <p className='mt-4 text-green-500'>Message sent successfully!</p>
      )}
      {error && <p className='mt-4 text-red-500'>{error}</p>}
    </div>
  );
};

export default ContactForm;
