"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import accountApiRequest from "../apiRequests/account";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Loader2,
  User,
  Phone,
  MapPin,
  Mail,
  Camera,
  Pencil,
} from "lucide-react";
import imageApiRequest from "../apiRequests/image";

type Profile = AccountResType;

const ProfileForm = ({ profile }: { profile: Profile }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    imageApiRequest.getUrl(profile.profileImageUrl)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      profileImageUrl: profile.profileImageUrl,
      address: profile.address,
    },
  });

  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await accountApiRequest.updateMe(values);
      console.log("Cập nhật thành công:", res);
      setEditMode(false);
      router.refresh();
    } catch (error: any) {
      console.error("Lỗi cập nhật thông tin:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subFolder", "Avatar");
      const imageUrl = (await imageApiRequest.upload(formData)).payload;
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewImage(previewImageUrl);
      form.setValue("profileImageUrl", imageUrl.filePath);
    }
  };

  const initials =
    profile.firstName && profile.lastName
      ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(
          0
        )}`.toUpperCase()
      : "UN";

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">Thông tin cá nhân</CardTitle>
        {!editMode ? (
          <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
            <Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        ) : null}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Avatar
                  className="h-32 w-32 cursor-pointer"
                  onClick={handleImageClick}
                >
                  {previewImage ? (
                    <AvatarImage src={previewImage} alt={profile.fullName} />
                  ) : null}
                  <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {editMode && (
                  <div className="absolute bottom-0 right-0 bg-amber-50 text-black p-2 rounded-full cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <Camera className="h-4 w-4" />
                  </div>
                )}
              </div>

              <h2 className="text-xl font-medium mt-3">{profile.fullName}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>

            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {editMode ? (
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                                <User className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input
                                placeholder="Họ"
                                className="rounded-l-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Họ
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{profile.firstName}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {editMode ? (
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                                <User className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input
                                placeholder="Tên"
                                className="rounded-l-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Tên
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{profile.lastName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Email
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              </div>

              <div>
                {editMode ? (
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="Số điện thoại"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Số điện thoại
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{profile.phoneNumber || "Chưa cập nhật"}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {editMode ? (
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="Địa chỉ"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Địa chỉ
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{profile.address || "Chưa cập nhật"}</span>
                    </div>
                  </div>
                )}
              </div>

              {editMode && (
                <FormField
                  control={form.control}
                  name="profileImageUrl"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input
                          {...field}
                          value={previewImage || profile.profileImageUrl}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {editMode && (
                <div className="flex space-x-4 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      setPreviewImage(
                        imageApiRequest.getUrl(profile.profileImageUrl)
                      );
                      form.reset({
                        id: profile.id,
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        phoneNumber: profile.phoneNumber,
                        profileImageUrl: profile.profileImageUrl,
                        address: profile.address,
                      });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang lưu
                      </>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
