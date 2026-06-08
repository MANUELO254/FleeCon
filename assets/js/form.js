/* ==========================================================================
   form.js — Contact form handling.

   Currently shows a fake "Message received" confirmation and clears the fields.
   When ready to wire to a real backend, replace the body of submitForm()
   with one of:

     a) Formspree:    https://formspree.io  — paste your endpoint URL below
     b) EmailJS:      https://www.emailjs.com
     c) WhatsApp deep link — build a wa.me URL with the form values

   The WhatsApp route is the simplest for a Kenyan contractor: instead of
   sending an email, the form just opens WhatsApp with a pre-filled message.
   Sample implementation is in handleWhatsAppSubmit() below — uncomment to use.
   ========================================================================== */

(function(){
  'use strict';

  const form = document.getElementById('form');
  if (!form) return;

  const ok = document.getElementById('formOk');

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitForm();
  });

  function submitForm(){
    // --- FAKE SUBMIT (current behaviour) ---
    if (ok) {
      ok.classList.add('show');
      if (window.lucide) lucide.createIcons();
    }
    form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    setTimeout(() => ok && ok.classList.remove('show'), 4500);

    // --- WHATSAPP SUBMIT (uncomment to use instead) ---
    // handleWhatsAppSubmit();
  }

  // Optional: send the form contents straight to WhatsApp.
  // Replace the phone number with the client's actual one (no +, no spaces).
  function handleWhatsAppSubmit(){
    const name    = form.querySelector('[name="name"]')?.value || '';
    const phone   = form.querySelector('[name="phone"]')?.value || '';
    const service = form.querySelector('[name="service"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    const text = encodeURIComponent(
      `Hi Fleecon, I'd like a quote.\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n\n` +
      `${message}`
    );

    const phoneNumber = '254700000000'; // <-- replace with client's WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  }

})();
