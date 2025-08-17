'use server';

export async function submitContactForm(data: {
  'your-name': string;
  'your-email': string;
  'your-subject': string;
  'your-message': string;
}) {
  const formId = process.env.CF7_FORM_ID || '87';
  const siteUrl = process.env.NEXT_PUBLIC_BLOG_API_URL;

  if (!formId || !siteUrl) {
    throw new Error('FormId and/or WordPress Site url missing');
  }

  const url = `${siteUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

  const formData = new FormData();
  formData.append('your-name', data['your-name']);
  formData.append('your-email', data['your-email']);
  formData.append('your-subject', data['your-subject']);
  formData.append('your-message', data['your-message']);
  // Add CF7 required fields
  formData.append('_wpcf7', formId);
  // formData.append('_wpcf7_version', '5.9.8');
  formData.append('_wpcf7_locale', 'en_US');
  formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);
  formData.append('_wpcf7_container_post', '0');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    console.log(response, result);

    if (result.status === 'mail_sent') {
      return { success: true };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    return { success: false, message: 'Server error occurred.' };
  }
}
