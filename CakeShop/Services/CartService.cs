namespace CakeShop.Services
{

    public class CartService
    {
        public event Action? OnCartUpdated;
        public List<string> CartItems { get; private set; } = new();
        public bool IsCartVisible { get; private set; } = false;

        public void AddToCart(string item)
        {
            CartItems.Add(item);
            IsCartVisible = true; // Khi thêm sản phẩm, giỏ hàng tự mở
            NotifyCartUpdated();
        }

        public void ToggleCart()
        {
            IsCartVisible = !IsCartVisible; // Nhấn vào icon thì mở/đóng giỏ hàng
            NotifyCartUpdated();
        }

        public void CloseCart()
        {
            IsCartVisible = false;
            NotifyCartUpdated();
        }

        public int GetCartCount() => CartItems.Count;

        private void NotifyCartUpdated() => OnCartUpdated?.Invoke();
    }

}
