export const WHATSAPP_NUMBER = '919122468465'

// =============================================================
//  PRODUCT CATALOG
//  Edit anything below — names, images, prices, availability.
//  available: true  → shows "AVAILABLE" + Add to Cart button
//  available: false → shows "NOT AVAILABLE" + disabled button
// =============================================================
export const categories = [
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'atta', name: 'Atta', icon: 'Wheat' },
  { id: 'rice', name: 'Rice', icon: 'Soup' },
  { id: 'oils', name: 'Oils', icon: 'Droplet' },
  { id: 'cleaning', name: 'Soap', icon: 'SprayCan' },
];

export const products = [
  // ================= SNACKS =================
  {
    id: 'b2',
    name: 'Marie Rs.30',
    image: '/Marie.jpg',
    unit: 'Pack',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b3',
    name: 'Prime Time Rs.40',
    image: '/Prime Time.jpg',
    unit: 'Rs.40',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b4',
    name: 'Premium Kaju',
    image: '/Premium Kaju.jpg',
    unit: '250 g',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b5',
    name: 'Maggi',
    image: '/Maggi Rs.7.jpg',
    unit: 'Rs.7',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b6',
    name: 'Maggi',
    image: '/Maggi Rs.15.jpg',
    unit: 'Rs.15',
    category: 'snacks',
    available: true,
  },

  // ================= ATTA =================
  {
    id: 'b7',
    name: 'Maida',
    image: '/Maida 500g.jpg',
    unit: '500 g',
    category: 'atta',
    available: true,
  },

  // ================= RICE =================
  // Add rice products here when you have rice image files.

  // ================= OILS =================
  {
    id: 'b8',
    name: 'Mahkosh Refined Oil',
    image: '/Mahkosh Refined Oil.jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },
  {
    id: 'b9',
    name: 'Saavli Sarso Tel',
    image: '/Saavli Sarso Tel.jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },
  {
    id: 'b10',
    name: 'Saavli Sarso Tel',
    image: '/Saavli Sarso Tel (2).jpg',
    unit: 'Pack',
    category: 'oils',
    available: true,
  },

  // ================= CLEANING =================
  {
    id: 'b11',
    name: 'Wheel Surf',
    image: '/Wheel Surf.jpg',
    unit: '2kg',
    category: 'cleaning',
    available: true,
  },
  {
    id: 'b12',
    name: 'Wheel',
    image: '/Wheel (500g).jpg',
    unit: '500 g',
    category: 'cleaning',
    available: true,
  },

  // ================= OTHER =================
  {
    id: 'b13',
    name: 'Meat Masala',
    image: '/Meat Masala.jpg',
    unit: 'Pack',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b14',
    name: 'Sabji Masala',
    image: '/Sabji Masala.jpg',
    unit: 'Pack',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b15',
    name: 'Tata Tea',
    image: '/Tata Tea (250g).jpg',
    unit: '250 g',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b16',
    name: 'Taaza',
    image: '/Taaza (250g).jpg',
    unit: '250 g',
    category: 'snacks',
    available: true,
  },
  {
    id: 'b17',
    name: 'Pears',
    image: '/Pears.jpg',
    unit: 'Pack',
    category: 'cleaning',
    available: true,
  },
  {
    id: 'b18',
    name: 'StayFree',
    image: '/StayFree.jpg',
    unit: 'Pack',
    category: 'cleaning',
    available: true,
  },
  {
    id: 'b19',
    name: 'StayFree Big',
    image: '/StayFree (Big).jpg',
    unit: 'Pack',
    category: 'cleaning',
    available: true,
  },
  {
    id: 'b20',
    name: 'MamyPoko Pants',
    image: '/MamyPokoPants.jpg',
    unit: 'Pack',
    category: 'cleaning',
    available: true,
  },
];