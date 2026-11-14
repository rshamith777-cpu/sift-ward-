import React, { useState, useEffect, useRef } from 'react';
import { Activity, Bell, Menu, X, Check, AlertCircle } from 'lucide-react';
import { NotificationItem } from '../types';

interface TopNavigationProps {
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
  onOpenWorkflowModal: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  isSimulating,
  onToggleSimulate,
  onOpenWorkflowModal,
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'signal-story', label: 'The gap', href: '#signal-story' },
    { id: 'observation-gap', label: 'Timeline', href: '#observation-gap' },
    { id: 'live-signals', label: 'Live signals', href: '#live-signals' },
    { id: 'sensor-value', label: 'Sensor value', href: '#sensor-value' },
    { id: 'workflow', label: 'Workflow', href: '#workflow' },
    { id: 'evidence', label: 'Evidence', href: '#evidence' },
  ];

  // Observe active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        if (!el) return { id: link.id, top: 0, bottom: 0 };
        const rect = el.getBoundingClientRect();
        return {
          id: link.id,
          top: rect.top + scrollY - 140,
          bottom: rect.bottom + scrollY - 140,
        };
      });

      const current = sections.find(
        (sec) => scrollY >= sec.top && scrollY <= sec.bottom
      );
      if (current) {
        setActiveSection(current.id);
      } else if (scrollY < 200) {
        setActiveSection('overview');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close notifications popover on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isNotifOpen]);

  return (
    <header
      role="banner"
      style={{
        position: 'sticky',
        top: '14px',
        zIndex: 50,
        width: '100%',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        className="layout-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1120px',
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 30px -6px rgba(44, 62, 53, 0.08), 0 2px 8px -2px rgba(44, 62, 53, 0.04)',
            borderRadius: '9999px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Brand Logo & Wordmark */}
          <a
            href="#overview"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--text-slate)',
            }}
            aria-label="SIFT-Ward Home"
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4B8C81 0%, #376E65 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(75, 140, 129, 0.35)',
              }}
            >
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-slate)',
                  }}
                >
                  SIFT-Ward
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(217, 138, 108, 0.16)',
                    color: 'var(--terracotta-dark)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 700,
                  }}
                >
                  DEMO
                </span>
              </div>
              <span
                className="nav-brand-sub"
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  color: 'var(--text-subtle)',
                  fontWeight: 500,
                  marginTop: '-2px',
                }}
              >
                Respiratory Safety Pathway
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
            }}
            className="desktop-nav"
          >
            <style>{`
              @media (min-width: 900px) {
                .desktop-nav {
                  display: flex !important;
                }
                .mobile-menu-btn {
                  display: none !important;
                }
              }
              @media (max-width: 480px) {
                .nav-demo-toggle {
                  display: none !important;
                }
              }
              @media (max-width: 380px) {
                .nav-brand-sub {
                  display: none !important;
                }
              }
            `}</style>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    color: isActive ? 'var(--sage-teal-dark)' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'rgba(220, 230, 225, 0.6)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-slate)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Controls & Notifications */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Simulation live toggle (hidden on very small screens; the same control exists in the monitor panel) */}
            <button
              onClick={onToggleSimulate}
              type="button"
              className="btn-ghost nav-demo-toggle"
              style={{
                fontSize: '0.78rem',
                padding: '6px 12px',
                background: isSimulating ? 'rgba(75, 140, 129, 0.12)' : 'rgba(0,0,0,0.03)',
                borderColor: isSimulating ? 'var(--sage-teal)' : 'var(--border-slate-subtle)',
                color: isSimulating ? 'var(--sage-teal-dark)' : 'var(--text-muted)',
              }}
              aria-label={isSimulating ? 'Pause synthetic preview' : 'Resume synthetic preview'}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: isSimulating ? '#10B981' : '#9CA3AF',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {isSimulating ? 'Live Demo: On' : 'Demo: Paused'}
              </span>
            </button>

            {/* Notification Popover Trigger */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isNotifOpen ? 'rgba(220, 230, 225, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid var(--border-slate-subtle)',
                  cursor: 'pointer',
                  position: 'relative',
                  color: 'var(--text-slate)',
                  transition: 'all 0.15s ease',
                }}
                aria-label={`Demo notifications (${unreadCount} unread)`}
                aria-expanded={isNotifOpen}
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--terracotta)',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF',
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Popover Card */}
              {isNotifOpen && (
                <div
                  role="dialog"
                  aria-label="Simulated notifications panel"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '340px',
                    maxWidth: '90vw',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border-slate-subtle)',
                    padding: '16px',
                    zIndex: 60,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-slate-subtle)',
                      paddingBottom: '10px',
                      marginBottom: '12px',
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Demo Activity Alerts</h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                        Synthetic notification stream
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={onMarkAllNotificationsRead}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--sage-teal)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <Check size={12} /> Mark all read
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: '10px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: n.read ? 'rgba(246, 243, 238, 0.4)' : 'rgba(220, 230, 225, 0.25)',
                          border: n.read ? '1px solid var(--border-slate-subtle)' : '1px solid rgba(75, 140, 129, 0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-slate)' }}>
                            {n.title}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                            {n.timestamp}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {n.message}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                          {n.actionLabel && (
                            <button
                              type="button"
                              onClick={() => {
                                onOpenWorkflowModal();
                                setIsNotifOpen(false);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--terracotta-dark)',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                            >
                              {n.actionLabel} &rarr;
                            </button>
                          )}
                          {!n.read && (
                            <button
                              type="button"
                              onClick={() => onMarkNotificationRead(n.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-subtle)',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                marginLeft: 'auto',
                              }}
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: '12px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-slate-subtle)',
                      fontSize: '0.7rem',
                      color: 'var(--text-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <AlertCircle size={12} />
                    <span>Non-clinical prototype events for testing.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--border-slate-subtle)',
                cursor: 'pointer',
                color: 'var(--text-slate)',
              }}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          role="navigation"
          aria-label="Mobile Navigation"
          style={{
            pointerEvents: 'auto',
            marginTop: '8px',
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-slate-subtle)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                color: activeSection === link.id ? 'var(--sage-teal-dark)' : 'var(--text-slate)',
                backgroundColor: activeSection === link.id ? 'rgba(220, 230, 225, 0.5)' : 'transparent',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ height: '1px', background: 'var(--border-slate-subtle)', margin: '4px 0' }} />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenWorkflowModal();
            }}
            style={{ width: '100%' }}
          >
            Response Pathway Guide
          </button>
        </div>
      )}
    </header>
  );
};
