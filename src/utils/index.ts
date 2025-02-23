import _ from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

// format theo thời gian Việt Nam
dayjs.locale("vi"); 

export const formatDate = (dateString: string) => {
  dayjs.extend(relativeTime);
  return dayjs(dateString).fromNow();
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Không thể sao chép: ", err);
  }
};

export const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const generateYears = (startYear: number, endYear: number): number[] => {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomItemInArray = (array: any) => {
  return array[Math.floor(Math.random() * array.length)];
};

interface shareInfo {
  title: string;
  text: string;
  url: string;
}

export const shareInfo = async (data: shareInfo) => {
  if (navigator.share) {
    await navigator.share(data);
  } else {
    alert("Trình duyệt không hỗ trợ chia sẻ");
  }
};
