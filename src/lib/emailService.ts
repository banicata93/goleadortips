// Temporary email service using Web3Forms (free, no backend needed)
// This will work immediately without database setup

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Using Web3Forms free API (no signup needed for testing)
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_KEY', // You can get free key at web3forms.com
        name: data.name,
        email: data.email,
        message: data.message,
        subject: 'New Contact Form Submission - GoLeadorTips',
        from_name: 'GoLeadorTips Contact Form',
        to: 'info@goleadortips.com'
      })
    });

    const result = await response.json();
    
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.message };
    }
  } catch (error: any) {
    console.error('Email service error:', error);
    return { success: false, error: error.message };
  }
}

// Alternative: Store locally and show success (for demo purposes)
export function storeContactLocally(data: ContactFormData): boolean {
  try {
    const contacts = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    contacts.push({
      ...data,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    });
    localStorage.setItem('contact_messages', JSON.stringify(contacts));
    console.log('✅ Contact stored locally:', data);
    return true;
  } catch (error) {
    console.error('Local storage error:', error);
    return false;
  }
}
