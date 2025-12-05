import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Upload, Mail, User, Briefcase, MapPin } from 'lucide-react';

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'admin' | 'staff';
}

export function ProfilePopup({ isOpen, onClose, userRole }: ProfilePopupProps) {
  const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=admin');
  const [isUploading, setIsUploading] = useState(false);

  const profileData = {
    admin: {
      name: 'Alex Thompson',
      email: 'alex.thompson@orxus.pm',
      role: 'Project Administrator',
      department: 'Management',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      joinDate: 'Jan 2023',
      tasksManaged: 156,
      teamMembers: 12,
    },
    staff: {
      name: 'Jordan Davis',
      email: 'jordan.davis@orxus.pm',
      role: 'Senior Developer',
      department: 'Engineering',
      location: 'New York, NY',
      phone: '+1 (555) 987-6543',
      joinDate: 'Mar 2023',
      tasksCompleted: 87,
      currentTasks: 8,
    },
  };

  const profile = profileData[userRole];

  const handleAvatarUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      const newSeed = Math.random().toString(36).substring(7);
      setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${newSeed}`);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>Manage your profile information and settings.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                onClick={handleAvatarUpload}
                disabled={isUploading}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-teal-600 hover:bg-teal-700"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{profile.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{profile.role}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{profile.department}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input id="name" defaultValue={profile.name} className="rounded-lg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input id="email" type="email" defaultValue={profile.email} className="rounded-lg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-600">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={profile.phone} className="rounded-lg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input id="location" defaultValue={profile.location} className="rounded-lg" />
            </div>
          </div>

          <Separator />

          {/* Statistics */}
          <div>
            <h4 className="text-gray-900 mb-4">Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-sm text-gray-500 mb-1">Joined</p>
                <p className="text-gray-900">{profile.joinDate}</p>
              </div>
              {userRole === 'admin' ? (
                <>
                  <div className="p-4 rounded-xl bg-teal-50">
                    <p className="text-sm text-teal-600 mb-1">Tasks Managed</p>
                    <p className="text-teal-700">{profile.tasksManaged}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50">
                    <p className="text-sm text-blue-600 mb-1">Team Members</p>
                    <p className="text-blue-700">{profile.teamMembers}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-green-50">
                    <p className="text-sm text-green-600 mb-1">Completed</p>
                    <p className="text-green-700">{profile.tasksCompleted}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-50">
                    <p className="text-sm text-orange-600 mb-1">Current</p>
                    <p className="text-orange-700">{profile.currentTasks}</p>
                  </div>
                </>
              )}
              <div className="p-4 rounded-xl bg-purple-50">
                <p className="text-sm text-purple-600 mb-1">Rating</p>
                <p className="text-purple-700">4.8/5.0</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}