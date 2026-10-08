export const WHATSAPP_NUMBER = '919122468465'

// =============================================================
//  PRODUCT CATALOG
//  Edit anything below — names, images, prices, availability.
//  available: true  → shows "AVAILABLE" + Add to Cart button
//  available: false → shows "NOT AVAILABLE" + disabled button
// =============================================================
export const categories = [
{ id: 'snacks', name: 'Snacks', icon: 'Cookie' },
{ id: 'atta', name: 'Atta & Flour', icon: 'Wheat' },
{ id: 'rice', name: 'Rice', icon: 'Soup' },
{ id: 'oils', name: 'Oils', icon: 'Droplet' },
{ id: 'cleaning', name: 'Soap & Cleaning', icon: 'SprayCan' },
{ id: 'personal-care', name: 'Personal Care', icon: 'Heart' },
{ id: 'baby-care', name: 'Baby Care', icon: 'Baby' },
{ id: 'biscuits', name: 'Biscuits & Chocolate', icon: 'Cookie' },
{ id: 'masala', name: 'Masala & Spices', icon: 'Flame' },
];

export const products = [
  // ================= SNACKS =================
  {
    id: 'b4',
    name: 'Premium Kaju',
    image: 'https://i.ibb.co/GvgtC7jD/Premium-Kaju.jpg',
    unit: '250 g',
    category: 'snacks',
    available: true,
  },

  // ================= BISCUITS =================
  {
    id: 'b2',
    name: 'Marie Rs.30',
    image: 'https://i.ibb.co/ksc2MZ4r/Marie.jpg',
    unit: 'Pack',
    category: 'biscuits',
    available: true,
  },
  {
    id: 'b3',
    name: 'Prime Time Rs.40',
    image: 'https://i.ibb.co/HLdBqy2t/Prime-Time.jpg',
    unit: 'Rs.40',
    category: 'biscuits',
    available: true,
  },
  {
    id: 'b23',
    name: 'Horlicks Biscuit (Rs.10)',
    image: 'https://i.ibb.co/HLK2C0h1/Horlicks-Biscuit.jpg',
    unit: 'Pack',
    category: 'biscuits',
    available: true,
  },

  // ================= ATTA & FLOUR =================
  {
    id: 'b7',
    name: 'Maida',
    image: 'https://i.ibb.co/GQvShD3K/Maida-500g.jpg',
    unit: '500 g',
    category: 'atta',
    available: true,
  },

  // ================= RICE =================
  // Add rice products here when you have rice images.

  // ================= OILS =================
  {
    id: 'b8',
    name: 'Mahkosh Refined Oil',
    image: 'https://i.ibb.co/392bvHmt/Mahkosh-Refined-Oil.jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },
  {
    id: 'b9',
    name: 'Saavli Sarso Tel',
    image: 'https://i.ibb.co/KjgBpWG2/Saavli-Sarso-Tel.jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },
  {
    id: 'b10',
    name: 'Saavli Sarso Tel',
    image: 'https://i.ibb.co/DdrJhZd/Saavli-Sarso-Tel-2.jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },
  {
    id: 'b22',
    name: 'Hathi Sarso Tel',
    image: 'https://i.ibb.co/hJ3z0Ld7/Hathi-Sarso-Tel.jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },

  // ================= MASALA & SPICES =================
  {
    id: 'b13',
    name: 'Meat Masala',
    image: 'https://i.ibb.co/CsvG02mf/Meat-Masala.jpg',
    unit: 'Pack',
    category: 'masala',
    available: true,
  },
  {
    id: 'b14',
    name: 'Sabji Masala',
    image: 'https://i.ibb.co/v7fbpR1/Sabji-Masala.jpg',
    unit: 'Pack',
    category: 'masala',
    available: true,
  },

  // ================= CLEANING =================
  {
    id: 'b11',
    name: 'Wheel Surf',
    image: 'https://i.ibb.co/v4KSyJ4n/Wheel-Surf.jpg',
    unit: '2 kg',
    category: 'cleaning',
    available: true,
  },
  {
    id: 'b12',
    name: 'Wheel',
    image: 'https://i.ibb.co/5xv54YJ2/Wheel-500g.jpg',
    unit: '500 g',
    category: 'cleaning',
    available: true,
  },

  // ================= PERSONAL CARE =================
  {
    id: 'b17',
    name: 'Pears',
    image: 'https://i.ibb.co/7NWys17V/Pears.jpg',
    unit: 'Pack',
    category: 'personal-care',
    available: true,
  },
  {
    id: 'b18',
    name: 'StayFree',
    image: 'https://i.ibb.co/gL7zrxNd/Stay-Free.jpg',
    unit: 'Pack',
    category: 'personal-care',
    available: true,
  },
  {
    id: 'b19',
    name: 'StayFree Big',
    image: 'https://i.ibb.co/gFyVF1gR/Stay-Free-Big.jpg',
    unit: 'Pack',
    category: 'personal-care',
    available: true,
  },
  {
    id: 'b21',
    name: 'Glow Lovely',
    image: 'https://i.ibb.co/tML35H6q/Glow-Lovely.jpg',
    unit: 'Pack',
    category: 'personal-care',
    available: true,
  },
  {
    id: 'b30',
    name: 'Patanjali Saundarya Face Wash',
    image: 'https://i.ibb.co/0Rq1mpfR/Patagali-Saundarya-Face-Wash-100g.jpg',
    unit: '100 g',
    category: 'personal-care',
    available: true,
  },
  {
    id: 'b31',
    name: 'Ponds Bright Beauty',
    image: 'https://i.ibb.co/KcXhQJX8/Ponds-Bright-Beaauty.jpg',
    unit: 'Pack',
    category: 'personal-care',
    available: true,
  },

  // ================= BABY CARE =================
  {
    id: 'b20',
    name: 'MamyPoko Pants',
    image: 'https://i.ibb.co/TBJ336YM/Mamy-Poko-Pants.jpg',
    unit: 'Pack',
    category: 'baby-care',
    available: true,
  },
  {
    id: 'b24',
    name: "Johnson's Baby 25ml",
    image: 'https://i.ibb.co/d0GnrgYF/Johnsons-Baby-25ml.jpg',
    unit: '25 ml',
    category: 'baby-care',
    available: true,
  },
  {
    id: 'b25',
    name: "Johnson's Baby 100ml",
    image: 'https://i.ibb.co/PZdvmJFC/Johnsons-Baby-100ml.jpg',
    unit: '100 ml',
    category: 'baby-care',
    available: true,
  },
  {
    id: 'b26',
    name: "Johnson's Baby Powder 25g",
    image: 'https://i.ibb.co/LhPC4LPj/Johnsons-Baby-Powder-25g.jpg',
    unit: '25 g',
    category: 'baby-care',
    available: true,
  },
  {
    id: 'b27',
    name: "Johnson's Baby Shampoo 50ml",
    image: 'https://i.ibb.co/MkSTJywJ/Johnsons-Baby-Shampoo-50ml.jpg',
    unit: '50 ml',
    category: 'baby-care',
    available: true,
  },
  {
    id: 'b28',
    name: "Johnson's Baby Shampoo 100ml",
    image: 'https://i.ibb.co/s9x7LXS1/Johnsons-Baby-Shampoo-100ml.jpg',
    unit: '100 ml',
    category: 'baby-care',
    available: true,
  },
  {
    id: 'b29',
    name: "Johnson's Baby Soap 25g",
    image: 'https://i.ibb.co/v692pGBb/Johnsons-Baby-Soap-25g.jpg',
    unit: '25 g',
    category: 'baby-care',
    available: true,
  },

  // ================= TEA =================
  {
    id: 'b15',
    name: 'Tata Tea',
    image: 'https://i.ibb.co/WWSk0C6b/Tata-Tea-250g.jpg',
    unit: '250 g',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b16',
    name: 'Taaza',
    image: 'https://i.ibb.co/SwSCzYMJ/Taaza-250g.jpg',
    unit: '250 g',
    category: 'snacks',
    available: true,
  },

  // ================= INSTANT FOOD =================
  {
    id: 'b5',
    name: 'Maggi Rs.7',
    image: 'https://i.ibb.co/LX0fxSkT/Maggi-Rs-7.jpg',
    unit: 'Rs.7',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b6',
    name: 'Maggi Rs.15',
    image: 'https://i.ibb.co/Ld6pkGKt/Maggi-Rs-15.jpg',
    unit: 'Rs.15',
    category: 'snacks',
    available: true,
  },
  {
  id: 'b32',
  name: 'Aloe Vera Gel 150g',
  image: 'https://i.ibb.co/Xrz8pKQY/Alo-vera-Jel-150g.jpg',
  unit: '150 g',
  category: 'personal-care',
  available: true,
},
{
  id: 'b33',
  name: 'Besan',
  image: 'https://i.ibb.co/zWfxWBjk/Besan.jpg',
  unit: 'Pack',
  category: 'atta',
  available: true,
},
{
  id: 'b34',
  name: 'Celebration',
  image: 'https://i.ibb.co/Tqvk2Vfd/Celebration-2.jpg',
  unit: 'Pack',
  category: 'biscuits',
  available: true,
},
{
  id: 'b35',
  name: 'Celebration',
  image: 'https://i.ibb.co/XfBhfr8t/Celebration.jpg',
  unit: 'Pack',
  category: 'biscuits',
  available: true,
},
{
  id: 'b36',
  name: 'Chhole Masala',
  image: 'https://i.ibb.co/vSmK6yF/Chhole-Masala.jpg',
  unit: 'Pack',
  category: 'masala',
  available: true,
},
{
  id: 'b37',
  name: 'Dove',
  image: 'https://i.ibb.co/Rk1zLZgL/Dove.jpg',
  unit: 'Pack',
  category: 'personal-care',
  available: true,
},
{
  id: 'b38',
  name: 'Bourbon Biscuit Rs.10',
  image: 'https://i.ibb.co/VcK83mHj/BOURBON-Biscuit-Rs-10.jpg',
  unit: 'Rs.10',
  category: 'biscuits',
  available: true,
},
{
  id: 'b39',
  name: 'Aloe Vera Face Wash Patanjali',
  image: 'https://i.ibb.co/fYWRxm4x/IMG20261008150426.jpg',
  unit: 'Pack',
  category: 'snacks',
  available: true,
},
{
  id: 'b40',
  name: 'Patanjali Saundarya Face Wash',
  image: 'https://i.ibb.co/0Rq1mpfR/Patagali-Saundarya-Face-Wash-100g.jpg',
  unit: '100 g',
  category: 'personal-care',
  available: true,
},
];