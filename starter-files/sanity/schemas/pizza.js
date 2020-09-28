import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible name
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      // TODO Add custom input component
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      topping4: 'toppings.4.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // 1. Filter undefined toppings out
      const tops = Object.values(toppings).filter(Boolean);
      // 1.5 determine if more than 4 toppings
      let previewOfValidToppings = [];
      console.log(tops.length);
      if (tops.length > 4) {
        previewOfValidToppings = tops.slice(0, 4);
        previewOfValidToppings.push(` + ${tops.length - 4} more`);
      } else {
        previewOfValidToppings = tops;
      }
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: previewOfValidToppings.join(', '),
      };
    },
  },
};
