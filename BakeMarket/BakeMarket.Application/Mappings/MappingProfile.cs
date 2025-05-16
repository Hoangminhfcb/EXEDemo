using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using AutoMapper;

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

        }
    }
}
