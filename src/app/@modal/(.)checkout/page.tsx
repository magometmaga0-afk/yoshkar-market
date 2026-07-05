import Modal from "@/components/Modal";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutModalPage() {
  return (
    <Modal maxWidthClassName="sm:max-w-4xl" activePathPrefix="/checkout">
      <h1 className="mb-5 text-xl font-bold">Оформление заказа</h1>
      <CheckoutForm />
    </Modal>
  );
}
