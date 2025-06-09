using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using AutoMapper;
using System.Security.Cryptography;

namespace BakeMarket.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping cho User
            CreateMap<CreateUserRequest, User>();

            CreateMap<UpdateUserRequest, User>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<User, UpdateUserResponse>();

            CreateMap<User, CreateUserResponse>();

            CreateMap<User, AboutMe>();

            CreateMap<CreateBakeryRequest, Bakery>();

            CreateMap<CreateCakeRequest, Cake>();
            CreateMap<CreateCakeRequest, CakeDTO>();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<CakeDTO, Cake>().ReverseMap();

            CreateMap<Bakery, BakeryDTO>().ReverseMap();
            CreateMap<CreateCakeRequest, Cake>()
                        .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images));

            CreateMap<CakeImageDTO, CakeImage>().ReverseMap();
            CreateMap<BakeryImage, BakeryImageDTO>();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<OrderCreateRequest, Order>();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();
            CreateMap<OrderCreateRequest, Order>()
     .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            CreateMap<OrderItemCreateRequest, OrderItem>()
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.UnitPrice));

        }
    }
}
