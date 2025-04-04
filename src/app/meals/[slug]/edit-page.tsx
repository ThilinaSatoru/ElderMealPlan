import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProfileEditForm, { HealthProfile } from './edit-form';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle
} from '@/components/ui/alert';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

const ProfileEditPage: React.FC = () => {
    const router = useRouter();
    const { userId } = router.query as { userId?: string };

    const [profile, setProfile] = useState<HealthProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

    useEffect(() => {
        if (!userId) return;

        let isMounted = true;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/profiles/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch profile data');

                const data: HealthProfile = await response.json();
                if (isMounted) {
                    setProfile(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) setError('Failed to load profile data. Please try again.');
                console.error('Error fetching profile:', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [userId]);


    // Handle save
    const handleSave = async (formData: HealthProfile) => {
        try {
            setSaveStatus('saving');

            const response = await fetch(`/api/profiles/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save profile data');
            }

            setProfile(formData);
            setSaveStatus('success');

            setTimeout(() => {
                router.push('/profiles');
            }, 1500);
        } catch (err) {
            setSaveStatus('error');
            console.error('Error saving profile:', err);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        router.push('/profiles');
    };

    if (loading) {
        return (
            <div className="container py-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-8 max-w-4xl mx-auto">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container py-8">
            {saveStatus === 'success' && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Profile updated successfully. Redirecting...</AlertDescription>
                </Alert>
            )}

            {saveStatus === 'error' && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Save failed</AlertTitle>
                    <AlertDescription>There was a problem saving your changes. Please try again.</AlertDescription>
                </Alert>
            )}

            {profile && <ProfileEditForm profile={profile} onSave={handleSave} onCancel={handleCancel} />}

        </div>
    );
};

export default ProfileEditPage;
