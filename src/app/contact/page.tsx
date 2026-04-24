'use client';
import { useState } from 'react';
import { AccentDot } from '@/components/common/accent-dot';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 800));
    setStatus('sent');
  };

  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--text-inverse)', minHeight: '100vh' }}>
      <div style={{
        maxWidth:      'var(--grid-max)',
        marginInline:  'auto',
        paddingInline: 'var(--section-inset)',
        paddingTop:    'calc(var(--space-10) + var(--space-8))',
        paddingBottom: 'var(--section-gap)',
      }}>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap:                 'var(--space-10)',
          alignItems:          'start',
        }}>

          {/* Left: Info */}
          <div>
            <span style={{
              fontFamily:    'var(--font-body)',
              fontSize:      'var(--text-xs)',
              fontWeight:    500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--primary)',
              display:       'block',
              marginBottom:  'var(--space-5)',
            }}>
              Get in touch
            </span>
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-3xl)',
              fontWeight:    700,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    'var(--leading-tight)',
              marginBottom:  'var(--space-7)',
            }}>
              Tell us what you&apos;re working on <AccentDot style={{ marginLeft: '0.1em' }} />
            </h1>
            <p style={{
              fontSize:     'var(--text-base)',
              lineHeight:   'var(--leading-loose)',
              color:        'var(--text-muted-inv)',
              marginBottom: 'var(--space-8)',
              maxWidth:     '40ch',
            }}>
              We respond to every enquiry within one working day. If the project is a good fit, we will schedule a call to understand more.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-2)' }}>
                  Email
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--primary)' }}>
                  hello@thecraftmachine.fr
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-2)' }}>
                  Based in
                </p>
                <p style={{ fontSize: 'var(--text-base)' }}>Paris, France</p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-2)' }}>
                  Response time
                </p>
                <p style={{ fontSize: 'var(--text-base)' }}>Within one working day</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {status === 'sent' ? (
              <div style={{
                padding:      'var(--space-9)',
                background:   'var(--surface-dark-alt)',
                borderRadius: 'var(--radius-lg)',
                textAlign:    'center',
              }}>
                <p style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--text-xl)',
                  fontWeight:    600,
                  marginBottom:  'var(--space-4)',
                }}>
                  Message received.
                </p>
                <p style={{ color: 'var(--text-muted-inv)', fontSize: 'var(--text-base)' }}>
                  We will be in touch within one working day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {[
                  { name: 'name',    label: 'Your name',    type: 'text',  required: true },
                  { name: 'email',   label: 'Email address', type: 'email', required: true },
                  { name: 'company', label: 'Company',       type: 'text',  required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      style={{
                        display:       'block',
                        fontSize:      'var(--text-xs)',
                        fontWeight:    500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'var(--text-muted-inv)',
                        marginBottom:  'var(--space-2)',
                      }}
                    >
                      {label}{required && <span aria-hidden="true" style={{ color: 'var(--primary)' }}> *</span>}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      required={required}
                      value={form[name as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                      style={{
                        width:         '100%',
                        padding:       'var(--space-4)',
                        background:    'var(--surface-dark-alt)',
                        border:        '1px solid var(--border-dark)',
                        borderRadius:  'var(--radius-md)',
                        color:         'var(--text-inverse)',
                        fontSize:      'var(--text-base)',
                        fontFamily:    'var(--font-body)',
                        outline:       'none',
                        transition:    'border-color 200ms',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display:       'block',
                      fontSize:      'var(--text-xs)',
                      fontWeight:    500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--text-muted-inv)',
                      marginBottom:  'var(--space-2)',
                    }}
                  >
                    Your project <span aria-hidden="true" style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us about the project — what you're building, what success looks like, and your timeline."
                    style={{
                      width:         '100%',
                      padding:       'var(--space-4)',
                      background:    'var(--surface-dark-alt)',
                      border:        '1px solid var(--border-dark)',
                      borderRadius:  'var(--radius-md)',
                      color:         'var(--text-inverse)',
                      fontSize:      'var(--text-base)',
                      fontFamily:    'var(--font-body)',
                      outline:       'none',
                      resize:        'vertical',
                      transition:    'border-color 200ms',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    alignSelf:      'flex-start',
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            'var(--space-3)',
                    fontFamily:     'var(--font-body)',
                    fontSize:       'var(--text-sm)',
                    fontWeight:     700,
                    letterSpacing:  '0.08em',
                    textTransform:  'uppercase',
                    padding:        'var(--space-4) var(--space-6)',
                    background:     status === 'sending' ? 'var(--primary-hover)' : 'var(--primary)',
                    color:          '#fff',
                    border:         'none',
                    borderRadius:   'var(--radius-sm)',
                    cursor:         status === 'sending' ? 'wait' : 'pointer',
                    transition:     'background 200ms',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
