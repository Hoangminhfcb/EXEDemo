package com.example.bakemarket.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


import com.example.bakemarket.R;
import com.example.bakemarket.managers.CartManager;
import com.example.bakemarket.models.CartItem;
import com.example.bakemarket.models.Product;

import java.util.List;

public class CartAdapter extends RecyclerView.Adapter<CartAdapter.CartViewHolder> {
    private Context context;
    private List<CartItem> cartItems;
    private OnCartUpdateListener listener;

    public interface OnCartUpdateListener {
        void updateTotal();
    }

    public CartAdapter(Context context, List<CartItem> cartItems, OnCartUpdateListener listener) {
        this.context = context;
        this.cartItems = cartItems;
        this.listener = listener;
    }

    @NonNull
    @Override
    public CartViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_cart, parent, false);
        return new CartViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CartViewHolder holder, int position) {
        CartItem cartItem = cartItems.get(position);
        Product product = cartItem.getProduct();

        holder.productName.setText(product.getName());
        holder.productPrice.setText(product.getFormattedPrice());
        holder.quantityText.setText(String.valueOf(cartItem.getQuantity()));
        holder.totalPrice.setText(cartItem.getFormattedTotalPrice());

        // Load product image
//        Glide.with(context)
//                .load(product.getImageUrl())
//                .placeholder(R.drawable.ic_placeholder)
//                .error(R.drawable.ic_placeholder)
//                .into(holder.productImage);

        // Handle quantity increase
        holder.increaseButton.setOnClickListener(v -> {
            int newQuantity = cartItem.getQuantity() + 1;
            CartManager.getInstance().updateQuantity(product.getId(), newQuantity);
            cartItem.setQuantity(newQuantity);
            notifyItemChanged(position);
            listener.updateTotal();
        });

        // Handle quantity decrease
        holder.decreaseButton.setOnClickListener(v -> {
            int newQuantity = cartItem.getQuantity() - 1;
            if (newQuantity <= 0) {
                // Remove item from cart
                CartManager.getInstance().removeFromCart(product.getId());
                cartItems.remove(position);
                notifyItemRemoved(position);
                notifyItemRangeChanged(position, cartItems.size());
            } else {
                CartManager.getInstance().updateQuantity(product.getId(), newQuantity);
                cartItem.setQuantity(newQuantity);
                notifyItemChanged(position);
            }
            listener.updateTotal();
        });

        // Handle remove button
        holder.removeButton.setOnClickListener(v -> {
            CartManager.getInstance().removeFromCart(product.getId());
            cartItems.remove(position);
            notifyItemRemoved(position);
            notifyItemRangeChanged(position, cartItems.size());
            listener.updateTotal();
        });
    }

    @Override
    public int getItemCount() {
        return cartItems.size();
    }

    public class CartViewHolder extends RecyclerView.ViewHolder {
        ImageView productImage;
        TextView productName;
        TextView productPrice;
        TextView quantityText;
        TextView totalPrice;
        Button decreaseButton;
        Button increaseButton;
        Button removeButton;

        public CartViewHolder(@NonNull View itemView) {
            super(itemView);
            productImage = itemView.findViewById(R.id.cartProductImage);
            productName = itemView.findViewById(R.id.cartProductName);
            productPrice = itemView.findViewById(R.id.cartProductPrice);
            quantityText = itemView.findViewById(R.id.quantityText);
            totalPrice = itemView.findViewById(R.id.cartItemTotalPrice);
            decreaseButton = itemView.findViewById(R.id.decreaseButton);
            increaseButton = itemView.findViewById(R.id.increaseButton);
            removeButton = itemView.findViewById(R.id.removeButton);
        }
    }
}