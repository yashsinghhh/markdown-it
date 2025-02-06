import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Label } from "@/components/ui/label"; // ShadCN Label

type Role = "author" | "reader";

interface FormData {
  name: string;
  profilePhoto: string;
  about: string;
  socials: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  role: Role;
}

export const UserForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    profilePhoto: "",
    about: "",
    socials: {
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    role: "reader", // default role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5174/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          name: formData.name,
          profilePhoto: formData.profilePhoto,
          about: formData.about,
          socials: formData.socials,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user profile");
      }

      await user?.update({
        unsafeMetadata: { hasCompletedOnboarding: true },
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 space-y-6">
      {/* Name Input */}
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      {/* Profile Photo Input */}
      <div className="grid gap-2">
        <Label htmlFor="profilePhoto">Profile Photo URL</Label>
        <Input
          id="profilePhoto"
          type="url"
          value={formData.profilePhoto}
          onChange={(e) => setFormData((prev) => ({ ...prev, profilePhoto: e.target.value }))}
        />
      </div>

      {/* About Input */}
      <div className="grid gap-2">
        <Label htmlFor="about">About You</Label>
        <Input
          id="about"
          as="textarea"
          rows={4}
          value={formData.about}
          onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
          required
        />
      </div>

      {/* Socials Input */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Social Media Links</h3>
        {["twitter", "instagram", "linkedin"].map((platform) => (
          <div key={platform} className="grid gap-2">
            <Label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
            <Input
              id={platform}
              type="url"
              value={formData.socials[platform]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socials: { ...prev.socials, [platform]: e.target.value },
                }))
              }
            />
          </div>
        ))}
      </div>

      {/* Role Selection */}
      <div className="grid gap-2">
        <Label>Select Your Role</Label>
        <div className="flex space-x-4">
          {["reader", "author"].map((role) => (
            <Button
              key={role}
              type="button"
              variant={formData.role === role ? "default" : "outline"}
              onClick={() => setFormData((prev) => ({ ...prev, role }))}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Complete Profile
      </Button>
    </form>
  );
};