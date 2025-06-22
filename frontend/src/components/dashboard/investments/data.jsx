import {
  BeginImage,
  GrowImage,
  ThriveImage,
  TurboImage,
  MiniImage,
} from "../../../assets";
export const packageData = [
  {
    name: "",
    image: "https://res.cloudinary.com/dwyyrm9xw/image/upload/v1750576169/p5_xvf0p2.png",
    minAmount: 10,
    maxAmount: 10,
    description:
      "Take your investments to the next level with our professional package.",
    dailyReturns: "1.2%",
    durationInDays: 110,
    id: 5,
  },
  {
    name: "",
    image: "https://res.cloudinary.com/dwyyrm9xw/image/upload/v1750576169/3_dfcjtu.png",
    minAmount: 25,
    maxAmount: 2499,
    description: "Get started with our entry-level investment package.",
    dailyReturns: "1.5%",
    durationInDays: 150,
    id: 1,  
  },
  {
    name: "",
    image: "https://res.cloudinary.com/dwyyrm9xw/image/upload/v1750576169/p1_fv6pxh.png",
    minAmount: 2500,
    maxAmount: 19999,
    description:
      "Experience steady growth with our mid-tier investment package.",
    dailyReturns: "1.8%",
    durationInDays: 140,
    id: 2,
  },
  {
    name: "",
    image: "https://res.cloudinary.com/dwyyrm9xw/image/upload/v1750576169/p2_psmi7v.png",
    minAmount: 20000,
    maxAmount: 50000,
    description:
      "Take your investments to the next level with our professional package.",
    dailyReturns: "2.1%",
    durationInDays: 130,
    id: 3,
  },
  {
    name: "",
    image: "https://res.cloudinary.com/dwyyrm9xw/image/upload/v1750576169/p2_psmi7v.png",
    minAmount: 20000,
    maxAmount: 50000,
    description:
      "Take your investments to the next level with our professional package.",
    dailyReturns: "2.1%",
    durationInDays: 180,
    id: 4,
  },

];
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--bg-primary, white)",
    border: "1px solid var(--border-color, #e2e8f0)",
    borderRadius: "8px",
    padding: "1px",
    fontWeight: "400",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "var(--border-hover, #cbd5e1)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--bg-primary, white)",
    border: "1px solid var(--border-color, #e2e8f0)",
    borderRadius: "6px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? "var(--primary-color, #3b82f6)" 
      : state.isFocused 
        ? "var(--hover-bg, #f8fafc)" 
        : "transparent",
    color: state.isSelected 
      ? "white" 
      : "var(--text-primary, #1e293b)",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: state.isSelected 
        ? "var(--primary-color, #3b82f6)" 
        : "var(--hover-bg, #f8fafc)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--text-primary, #1e293b)",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--text-primary, #1e293b)",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text-secondary, #64748b)",
  }),
};
