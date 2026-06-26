/* ==========================================================================
   form.js - Contact form, wired to EmailJS.

   Setup (one-time, 5 minutes):
   1. Go to https://www.emailjs.com and create a free account
   2. Add Email Service → connect to davidkiarie6@gmail.com
      → copy the Service ID into EMAIL_SERVICE_ID below
   3. Create Email Template with these variables:
        {{from_name}}, {{phone}}, {{service}}, {{message}}, {{reply_to}}
      → copy the Template ID into EMAIL_TEMPLATE_ID below
   4. Go to Account → API Keys → copy Public Key into EMAIL_PUBLIC_KEY below
   5. That's it. Emails land in davidkiarie6@gmail.com.

   Until EmailJS is configured, the form falls back to a WhatsApp redirect
   so it's never broken for site visitors.
   ========================================================================== */

(function(){
  'use strict';

  /* ---- EmailJS config — fill these in after creating your EmailJS account ---- */
  const EMAIL_SERVICE_ID  = 'YOUR_SERVICE_ID';
  const EMAIL_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAIL_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
  /* --------------------------------------------------------------------------- */

  const PHONE = '254710678147';
  const emailJsReady = EMAIL_SERVICE_ID !== 'YOUR_SERVICE_ID';

  const form   = document.getElementById('form');
  const formOk = document.getElementById('formOk');
  const formErr = document.getElementById('formErr');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (emailJsReady){
      sendViaEmailJS();
    } else {
      sendViaWhatsApp();
    }
  });

  /* EmailJS send */
  function sendViaEmailJS(){
    if (!window.emailjs){
      sendViaWhatsApp();
      return;
    }
    submitBtn && setLoading(true);

    const params = {
      from_name: form.querySelector('[name="name"]')?.value || '',
      phone:     form.querySelector('[name="phone"]')?.value || '',
      service:   form.querySelector('[name="service"]')?.value || '',
      message:   form.querySelector('[name="message"]')?.value || '',
      reply_to:  form.querySelector('[name="email"]')?.value || 'no-email-provided',
    };

    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, params, EMAIL_PUBLIC_KEY)
      .then(() => {
        showSuccess();
        form.reset();
      })
      .catch(() => {
        /* Fallback to WhatsApp if EmailJS fails */
        sendViaWhatsApp();
      })
      .finally(() => setLoading(false));
  }

  /* WhatsApp fallback */
  function sendViaWhatsApp(){
    const name    = form.querySelector('[name="name"]')?.value || '';
    const phone   = form.querySelector('[name="phone"]')?.value || '';
    const service = form.querySelector('[name="service"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    const text = encodeURIComponent(
      `Hi Fleecon, I'd like to discuss a project.\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n\n` +
      `${message}`
    );

    window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');
    showSuccess();
    form.reset();
  }

  function showSuccess(){
    if (formOk){
      formOk.classList.add('show');
      if (window.lucide) lucide.createIcons();
      setTimeout(() => formOk.classList.remove('show'), 5000);
    }
  }

  function setLoading(on){
    if (!submitBtn) return;
    submitBtn.disabled = on;
    submitBtn.style.opacity = on ? '.65' : '1';
    submitBtn.innerHTML = on
      ? 'Sending...'
      : 'Send Message <i data-lucide="send" style="width:16px;height:16px"></i>';
    if (window.lucide) lucide.createIcons();
  }

})();