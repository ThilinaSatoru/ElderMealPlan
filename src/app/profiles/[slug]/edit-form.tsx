import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save } from 'lucide-react';

export type HealthProfile = {
    id: string;
    userId: string;
    ageGroup: string;
    gender: string;
    weightRange: string;
    heightRange: string;
    bmiCategory: string;
    location: string;
    diabetesDuration: string;
    medicationDuration: string;
    chronicDiseases: string[];
    fastingBloodSugar: string;
    postprandialBloodSugar: string;
    hba1cLevel: string;
    dietaryPreferences: string;
    allergies: string[];
    avoidanceFoods: string[];
    cookingMethods: string[];
};

type ProfileEditFormProps = {
    profile: HealthProfile;
    onSave: (data: HealthProfile) => void;
    onCancel: () => void;
};

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSave, onCancel }) => {
    const [formData, setFormData] = useState<HealthProfile>({ ...profile });

    const handleInputChange = (field: keyof HealthProfile, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: keyof HealthProfile, value: string, checked: boolean) => {
        setFormData(prev => {
            const updatedValues = checked
                ? [...prev[field] as string[], value]
                : (prev[field] as string[]).filter(item => item !== value);
            return { ...prev, [field]: updatedValues };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Update health profile information for {profile.userId}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="personal">
                        <TabsList className="grid grid-cols-3">
                            <TabsTrigger value="personal">Personal Info</TabsTrigger>
                            <TabsTrigger value="medical">Medical Info</TabsTrigger>
                            <TabsTrigger value="dietary">Dietary Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal">
                            <FormItem>
                                <FormLabel>Age Group</FormLabel>
                                <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange('ageGroup', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select age group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['18-30', '31-45', '46-60', '61+'].map(age => (
                                            <SelectItem key={age} value={age}>{age}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </TabsContent>
                    </Tabs>
                    <Separator className="my-6" />
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileEditForm;
