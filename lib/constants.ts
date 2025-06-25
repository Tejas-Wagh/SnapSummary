export type PlansType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

export const plans: PlansType[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? (process.env.DEV_STRIPE_BASIC_PLAN_URL as string)
        : (process.env.PROD_STRIPE_BASIC_PLAN_URL as string),
    priceId:
      process.env.NODE_ENV === "development"
        ? (process.env.DEV_STRIPE_BASIC_PLAN_PRICE_ID as string)
        : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? (process.env.DEV_STRIPE_PRO_PLAN_URL as string)
        : (process.env.PROD_STRIPE_PRO_PLAN_URL as string),
    priceId:
      process.env.NODE_ENV === "development"
        ? (process.env.DEV_STRIPE_PRO_PLAN_PRICE_ID as string)
        : "",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
