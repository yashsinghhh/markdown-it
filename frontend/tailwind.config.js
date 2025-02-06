// File: frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#2D3748',
  				light: '#4A5568'
  			},
  			accent: {
  				DEFAULT: '#4299E1',
  				light: '#63B3ED'
  			},
  			surface: '#FAFAFA'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'Fira Code',
  				'monospace'
  			]
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: '#2D3748',
  					a: {
  						color: '#4299E1',
  						'&:hover': {
  							color: '#3182CE'
  						}
  					},
  					h1: {
  						fontWeight: '700'
  					},
  					h2: {
  						fontWeight: '600'
  					},
  					code: {
  						backgroundColor: '#EDF2F7',
  						padding: '0.2em 0.4em',
  						borderRadius: '4px'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
};