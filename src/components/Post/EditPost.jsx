import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import MarkdownEditor from '../ui/markdown-editor';
import { Image as ImageIcon, Save, X, Upload } from 'lucide-react';

const MAX_IMAGE_SIZE_MB = 5;

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [currentImages, setCurrentImages] = useState([]); // URLs to keep
    const [newImages, setNewImages] = useState([]); // File objects
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef();

    useEffect(() => {
        fetchPost();
        // eslint-disable-next-line
    }, [postId]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/posts/${postId}`);
            setTitle(res.data.title);
            setContent(res.data.content);
            setCurrentImages(res.data.imageLinks || []);
        } catch (err) {
            toast.error('Failed to load post');
            console.log(err);
            navigate('/my-posts');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
    };

    const handleRemoveCurrentImage = (idx) => {
        setCurrentImages(currentImages.filter((_, i) => i !== idx));
    };

    const validate = () => {
        const errs = {};
        if (!title.trim()) errs.title = 'Title is required.';
        if (!content.trim()) errs.content = 'Content is required.';
        if (currentImages.length + newImages.length === 0) errs.images = 'At least one image is required.';
        for (const img of newImages) {
            if (img.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
                errs.images = `All images must be less than ${MAX_IMAGE_SIZE_MB}MB.`;
                break;
            }
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('keepImages', JSON.stringify(currentImages));
            if (newImages.length > 0) {
                newImages.forEach(img => formData.append('imageLinks', img));
            }
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            await axiosInstance.put(`/posts/${postId}`, formData, config);
            toast.success('Post updated successfully!');
            navigate('/my-posts');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to update post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="w-6 h-6" />
                            Edit Post
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Enter post title"
                                    required
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Content (Supports Markdown)</Label>
                                <MarkdownEditor
                                    id="content"
                                    value={content}
                                    onChange={(value) => setContent(value)}
                                    placeholder="Write your post content here... Supports Markdown formatting!"
                                    error={errors.content}
                                    rows={10}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Current Images</Label>
                                <div className="flex flex-wrap gap-4">
                                    {currentImages.length === 0 && <span className="text-gray-400">No images</span>}
                                    {currentImages.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img src={img} alt="Current" className="w-24 h-24 object-cover rounded shadow" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCurrentImage(idx)}
                                                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-colors"
                                                title="Remove image"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newImages">Upload New Images (will be added to the post)</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="newImages"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => { fileInputRef.current.value = null; setNewImages([]); }}
                                    >
                                        <Upload className="w-4 h-4" />
                                        Clear
                                    </Button>
                                </div>
                                {newImages.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {Array.from(newImages).map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={URL.createObjectURL(img)}
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded shadow"
                                            />
                                        ))}
                                    </div>
                                )}
                                {errors.images && <div className="text-red-500 text-xs mt-1">{errors.images}</div>}
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/my-posts')}
                                    disabled={saving}
                                    className="flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                                >
                                    {saving ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditPost; 