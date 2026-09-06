import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{colors:{ink:'#111315',paper:'#F4F0E8',signal:'#D92832',wine:'#801A20',steel:'#9A9995',lamp:'#F4B83F'},fontFamily:{display:['var(--font-display)'],sans:['var(--font-body)']}}},plugins:[]} satisfies Config;
