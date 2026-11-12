// pages/landing/robat-karim-apartments.jsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import WorkerCard from '../../components/cards/WorkerCard';
import Head from 'next/head';

export default function RabatKarimApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const res = await fetch('https://api.boomlex.ir/api/robat-karim-apartments');
      const data = await res.json();
      
      let apts = [];
      if (Array.isArray(data)) {
        apts = data;
      } else if (data.apartments && Array.isArray(data.apartments)) {
        apts = data.apartments;
      } else if (data.items && Array.isArray(data.items)) {
        apts = data.items;
      } else if (data.data && Array.isArray(data.data)) {
        apts = data.data;
      }
      
      // FILTER: Only apartments under 2 billion
      const filteredApts = apts.filter(apt => {
        // Assuming price is in a property like apt.price, apt.cost, etc.
        const price = apt.price || apt.cost || apt.amount || 0;
        return price < 2000000000; // 2 billion
      }).slice(0, 12); // Keep only first 12
      
      setApartments(filteredApts);
    } catch (error) {
      console.error('Error:', error);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const availableCount = apartments.length;

  return (
    <>
      <Head>
        <title>آپارتمان‌های زیر ۲ میلیارد در رباط کریم | قیمت استثنایی از ۱.۱ میلیارد</title>
        <meta name="description" content={`${availableCount} آپارتمان نوساز با قیمت زیر ۲ میلیارد تومان در رباط کریم. شروع قیمت از ۱.۱ میلیارد تومان، آماده سکونت، سند تک‌برگ. امکان بازدید فوری و مشاوره رایگان.`} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap');
          body {
            font-family: 'Vazirmatn', 'iransans', system-ui, sans-serif;
            margin: 0;
            padding: 0;
            background: white;
          }
          * {
            box-sizing: border-box;
          }
          .cta-button {
            transition: all 0.3s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }
          .apartment-card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .persian-text {
            text-align: right;
            direction: rtl;
          }
          .subtle-badge {
            animation: subtlePulse 3s infinite;
          }
          @keyframes subtlePulse {
            0% { opacity: 0.9; }
            50% { opacity: 1; }
            100% { opacity: 0.9; }
          }
          /* STICKY FOOTER CTA */
          .sticky-footer-cta {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 12px 16px;
            box-shadow: 0 -2px 20px rgba(0,0,0,0.15);
            z-index: 9999;
            border-top: 2px solid #059669; /* Green instead of orange */
            display: flex;
            gap: 12px;
          }
          .sticky-footer-cta button {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .sticky-footer-cta .call-btn {
            background: #059669; /* Green for affordable pricing */
            color: white;
          }
          .sticky-footer-cta .whatsapp-btn {
            background: #25D366;
            color: white;
          }
          /* Add padding to body to prevent content hiding behind sticky footer */
          body {
            padding-bottom: 80px;
          }
          @media (min-width: 769px) {
            .sticky-footer-cta {
              display: none;
            }
            body {
              padding-bottom: 0;
            }
          }
        `}</style>
      </Head>

      {/* STICKY FOOTER CTA - Always visible on mobile */}
      <div className="sticky-footer-cta">
        <button 
          onClick={() => window.location.href = 'tel:+989382740488'}
          className="call-btn"
          style={{ fontWeight: '600', fontSize: '1rem' }}
        >
          تماس برای قیمت استثنایی
        </button>
        <button 
          onClick={() => window.open('https://wa.me/989382740488', '_blank')}
          className="whatsapp-btn"
          style={{ fontWeight: '600', fontSize: '1rem' }}
        >
          لیست واحدها در واتساپ
        </button>
      </div>

      {/* Hero Section - SUPER COMPACT */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', /* Green theme */
        color: 'white',
        py: { xs: 3, md: 4 },
        px: 2,
        textAlign: 'center',
        width: '100%',
      }}>
        {/* Brand Only - Minimal */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span>آپارتمان‌های زیر ۲ میلیارد تومان</span>
          </div>
          <div style={{ 
            fontSize: '0.85rem',
            opacity: 0.9,
            marginTop: '0.25rem',
            direction: 'rtl'
          }}>
            شروع قیمت از ۱.۱ میلیارد | نوساز و آماده سکونت در رباط کریم
          </div>
        </div>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '300px',
          textAlign: 'center'
        }}>
          <div className="persian-text">
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid #e2e8f0',
              borderTopColor: '#059669', /* Green */
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: '#64748b' }}>در حال بارگذاری آپارتمان‌ها...</p>
          </div>
        </Box>
      ) : (
        <>
          {/* APARTMENTS FIRST - Mobile Optimized */}
          <Box sx={{ 
            py: 3,
            maxWidth: '1200px',
            margin: '0 auto',
            px: { xs: 2, md: 3 },
            minHeight: '300px'
          }}>
            {availableCount > 0 ? (
              <>
                <div className="persian-text" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}>
                  <div>
                    <h1 style={{
                      color: '#1e293b',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      margin: '0 0 0.25rem 0',
                      textAlign: 'right'
                    }}>
                      آپارتمان‌های رباط کریم ({availableCount} واحد)
                    </h1>
                    <p className="persian-text" style={{
                      color: '#059669', /* Green for price */
                      margin: 0,
                      textAlign: 'right',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      قیمت: زیر ۲ میلیارد تومان | شروع از ۱.۱ میلیارد
                    </p>
                  </div>
                </div>
                
                {/* Grid: 1 column on mobile, 3 columns on desktop */}
                <Grid container spacing={2}>
                  {apartments.map((apartment) => (
                    <Grid item xs={12} sm={6} md={4} key={apartment.id}>
                      <div className="apartment-card-hover" style={{ 
                        transition: 'all 0.3s ease',
                        height: '100%',
                        marginBottom: '1rem'
                      }}>
                        <Link 
                          href={`/worker/${apartment.id}?slug=${apartment.slug || ''}`}
                          passHref
                          legacyBehavior
                        >
                          <a style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                            <WorkerCard worker={apartment} />
                          </a>
                        </Link>
                      </div>
                    </Grid>
                  ))}
                </Grid>

                {/* Quick Stats After Apartments - RTL Fixed */}
                {availableCount > 0 && (
                  <Box sx={{ 
                    bgcolor: '#f0fdf4', /* Light green background */
                    py: 3,
                    borderRadius: '8px',
                    mt: 4,
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ 
                      maxWidth: '800px', 
                      margin: '0 auto',
                      direction: 'rtl'
                    }}>
                      <Grid container spacing={1}>
                        {[
                          { value: availableCount, label: 'واحد کارشناسی شده' },
                          { value: '۵۰-۱۰۰ متر', label: 'متراژ اقتصادی' },
                          { value: '۲۴ ساعته', label: 'پاسخگویی' },
                          { value: '۱.۱-۲ میلیارد', label: 'قیمت' }
                        ].map((stat, index) => (
                          <Grid item xs={6} sm={3} key={index}>
                            <div style={{ 
                              fontSize: '0.8rem', 
                              color: '#475569',
                              fontWeight: '500',
                              marginBottom: '0.25rem',
                              textAlign: 'right',
                              direction: 'rtl'
                            }}>
                              {stat.label}
                            </div>
                            <div style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold', 
                              color: '#059669', /* Green */
                              textAlign: 'right',
                              direction: 'rtl'
                            }}>
                              {stat.value}
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  </Box>
                )}

                {/* Social Proof - AFTER Apartments */}
                <Box sx={{ 
                  py: 4,
                  bgcolor: '#f0fdf4', /* Light green */
                  borderRadius: '12px',
                  mt: 6,
                  border: '1px solid #bbf7d0',
                  direction: 'rtl'
                }}>
                  <div style={{ 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    px: { xs: 2, md: 3 },
                  }}>
                    <h3 style={{ 
                      textAlign: 'center',
                      color: '#065f46',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      marginBottom: '1.5rem',
                      direction: 'rtl'
                    }}>
                      مزایای خرید از بوملکس
                    </h3>
                    
                    <Grid container spacing={2} sx={{ textAlign: 'center', direction: 'rtl' }}>
                      {[
                        { value: 'نوساز', label: 'آماده سکونت', icon: '🏠' },
                        { value: 'تک برگ', label: 'سند رسمی', icon: '📄' },
                        { value: '۱.۱ میلیارد', label: 'شروع قیمت', icon: '💰' },
                        { value: 'ضمانت', label: 'تضمین اصالت', icon: '✅' }
                      ].map((stat, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                          <div style={{ 
                            padding: '0.75rem 0.5rem',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <div style={{ 
                              fontSize: '1.3rem',
                              marginBottom: '0.5rem'
                            }}>
                              {stat.icon}
                            </div>
                            <div style={{ 
                              fontSize: '1.3rem', 
                              fontWeight: 'bold', 
                              color: '#059669',
                              marginBottom: '0.25rem',
                              direction: 'rtl'
                            }}>
                              {stat.value}
                            </div>
                            <div style={{ 
                              fontSize: '0.8rem', 
                              color: '#475569',
                              fontWeight: '500',
                              lineHeight: 1.4,
                              textAlign: 'center',
                              direction: 'rtl'
                            }}>
                              {stat.label}
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Box>

                {/* Desktop Only CTA Section (hidden on mobile) */}
                <Box sx={{
                  mt: 6,
                  p: 4,
                  bgcolor: '#f0fdf4', /* Light green */
                  borderRadius: '12px',
                  border: '1px solid #86efac',
                  textAlign: 'center',
                  display: { xs: 'none', md: 'block' }
                }}>
                  <h3 className="persian-text" style={{ 
                    margin: '0 0 1rem 0',
                    color: '#065f46',
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    textAlign: 'right'
                  }}>
                    فرصت محدود: خانه‌دار شوید!
                  </h3>
                  <p className="persian-text" style={{ 
                    color: '#475569', 
                    marginBottom: '1.5rem',
                    maxWidth: '500px',
                    margin: '0 auto',
                    textAlign: 'right',
                    fontSize: '1rem'
                  }}>
                    آپارتمان‌های نوساز زیر ۲ میلیارد با شروع قیمت ۱.۱ میلیارد تومان
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center', 
                    flexWrap: 'wrap',
                    maxWidth: '400px',
                    margin: '0 auto'
                  }}>
                    <button 
                      onClick={() => window.location.href = 'tel:+989382740488'}
                      style={{
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        padding: '14px 24px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        flex: 1,
                        minWidth: '140px'
                      }}
                      className="cta-button"
                    >
                      📞 تماس برای قیمت
                    </button>
                    <button 
                      onClick={() => window.open('https://wa.me/989382740488', '_blank')}
                      style={{
                        background: '#25D366',
                        color: 'white',
                        border: 'none',
                        padding: '14px 24px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        flex: 1,
                        minWidth: '140px'
                      }}
                      className="cta-button"
                    >
                      💬 لیست کامل در واتساپ
                    </button>
                  </div>
                </Box>
              </>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                textAlign: 'center'
              }}>
                <Image
                  src="/logo/half-heart.png"
                  alt="ajur half heart"
                  width={80}
                  height={79}
                  style={{ opacity: 0.6 }}
                />
                <h3 className="persian-text" style={{ 
                  marginTop: '1rem', 
                  color: '#475569', 
                  fontSize: '1.2rem',
                  textAlign: 'right'
                }}>
                  آپارتمانی در این بازه قیمتی موجود نیست
                </h3>
                <p className="persian-text" style={{ 
                  color: '#64748b', 
                  maxWidth: '400px', 
                  marginTop: '0.5rem',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                  textAlign: 'right',
                  fontSize: '0.9rem'
                }}>
                  برای اطلاع از آپارتمان‌های زیر ۲ میلیارد تماس بگیرید
                </p>
                <div style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <button 
                    onClick={() => window.location.href = 'tel:+989382740488'}
                    style={{
                      background: '#059669',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    📞 اطلاع از موجودی
                  </button>
                  <button 
                    onClick={() => window.open('https://wa.me/989382740488', '_blank')}
                    style={{
                      background: '#25D366',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    💬 پیام در واتساپ
                  </button>
                </div>
              </Box>
            )}
          </Box>

          {/* Clean Final CTA - Desktop Only */}
          <Box sx={{
            py: 6,
            px: 3,
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: 'white',
            textAlign: 'center',
            marginTop: '2rem',
            display: { xs: 'none', md: 'block' }
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="persian-text" style={{ 
                fontSize: '1.6rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                همین حالا خانه‌دار شوید!
              </h2>
              <p className="persian-text" style={{ 
                fontSize: '1rem',
                opacity: 0.9,
                marginBottom: '1.5rem',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                آپارتمان‌های نوساز زیر ۲ میلیارد با شروع قیمت ۱.۱ میلیارد تومان
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                flexWrap: 'wrap' 
              }}>
                <button 
                  onClick={() => window.location.href = 'tel:+989382740488'}
                  style={{
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    padding: '14px 28px',
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  className="cta-button"
                >
                  📞 تماس برای خرید
                </button>
              </div>
            </div>
          </Box>

          {/* Footer - Simple */}
          <Box sx={{
            py: 3,
            px: 2,
            bgcolor: '#1e293b',
            color: 'white',
            textAlign: 'center',
            borderTop: '1px solid #334155',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="persian-text" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1.5rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <a href="tel:+989382740488" style={{ 
                  color: '#4ade80', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem'
                }}>
                  📞 ۰۹۳۸۲۷۴۰۴۸۸
                </a>
                <a href="https://boomlex.ir" style={{ 
                  color: '#4ade80', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  صفحه اصلی بوملکس
                </a>
              </div>
              <p className="persian-text" style={{ 
                margin: 0, 
                fontSize: '0.8rem', 
                opacity: 0.8,
                borderTop: '1px solid #334155',
                paddingTop: '0.75rem',
                marginTop: '0.75rem',
                textAlign: 'right'
              }}>
                © {new Date().getFullYear()} بوملکس - آپارتمان‌های اقتصادی رباط کریم. تمامی حقوق محفوظ است.
              </p>
            </div>
          </Box>
        </>
      )}
    </>
  );
}