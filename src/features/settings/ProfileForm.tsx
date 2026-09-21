import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Role } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store/hooks';
import { updateUserProfile } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import { User as UserIcon, Mail, Shield, Save, Lock } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['admin', 'viewer']),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, isAdmin } = useAuth();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: (user?.role as Role) || 'viewer',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!isAdmin) {
      showToast({
        type: 'error',
        title: 'Action Restricted',
        description: 'Only Admin users can save profile changes.',
      });
      return;
    }

    // Simulate API save delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(updateUserProfile(data));
    showToast({
      type: 'success',
      title: 'Profile Updated',
      description: 'Your profile settings have been saved successfully.',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isAdmin && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
          <Lock className="h-4 w-4 shrink-0 text-amber-500" />
          <span>You are logged in as <strong>Viewer</strong>. Form fields are read-only for Viewer role.</span>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Full Name</label>
        <Input
          {...register('name')}
          disabled={!isAdmin}
          error={errors.name?.message}
          icon={<UserIcon className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Email Address</label>
        <Input
          {...register('email')}
          disabled={!isAdmin}
          error={errors.email?.message}
          icon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Assigned Role</label>
        <Select
          {...register('role')}
          disabled={!isAdmin}
          error={errors.role?.message}
          icon={<Shield className="h-4 w-4" />}
        >
          <option value="admin">Admin (Full Editing & Export Permissions)</option>
          <option value="viewer">Viewer (Read-Only Access)</option>
        </Select>
      </div>

      {isAdmin && (
        <Button
          type="submit"
          variant="default"
          isLoading={isSubmitting}
          disabled={!isDirty}
          className="mt-2 text-xs font-semibold"
        >
          <Save className="h-3.5 w-3.5 mr-1.5" /> Save Changes
        </Button>
      )}
    </form>
  );
}
