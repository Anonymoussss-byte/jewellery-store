export type CouponResult = {
  code: string;
  label: string;
  discount: number;
  isValid: boolean;
  message: string;
};

type CouponRule = {
  label: string;
  minimum?: number;
  calculate: (subtotal: number) => number;
};

const coupons: Record<string, CouponRule> = {
  AURELIA10: {
    label: "Aurelia private client 10%",
    calculate: (subtotal) => subtotal * 0.1
  },
  DIAMOND500: {
    label: "$500 diamond atelier credit",
    minimum: 5000,
    calculate: () => 500
  },
  ROYAL15: {
    label: "Royal suite 15%",
    minimum: 15000,
    calculate: (subtotal) => subtotal * 0.15
  }
};

export const resolveCoupon = (rawCode: string, subtotal: number): CouponResult => {
  const code = rawCode.trim().toUpperCase();

  if (!code) {
    return {
      code,
      label: "",
      discount: 0,
      isValid: false,
      message: "Enter a concierge code."
    };
  }

  const coupon = coupons[code];

  if (!coupon) {
    return {
      code,
      label: "",
      discount: 0,
      isValid: false,
      message: "That code is not recognized."
    };
  }

  if (coupon.minimum && subtotal < coupon.minimum) {
    return {
      code,
      label: coupon.label,
      discount: 0,
      isValid: false,
      message: `Requires a ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(coupon.minimum)} collection.`
    };
  }

  return {
    code,
    label: coupon.label,
    discount: Math.min(coupon.calculate(subtotal), subtotal),
    isValid: true,
    message: `${coupon.label} applied.`
  };
};
