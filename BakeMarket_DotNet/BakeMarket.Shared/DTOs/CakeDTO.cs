﻿using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class CakeDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CategoryDTO Category { get; set; }
        public decimal Price { get; set; }
        public string ThumbnailUrl { get; set; }
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
        public bool IsAvailable { get; set; }
        public int StockQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public BakeryDTO Bakery { get; set; }
        public ICollection<CakeImageDTO>? Images { get; set; }
    }
}
