import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { ChevronLeft, LogOut, Settings as SettingsIcon, Share2, Camera, X, Check, Search, Filter, SlidersHorizontal, ArrowLeftRight, Heart, Repeat, MessageCircle, User as UserIcon } from 'lucide-react';
import { Button } from './components/Button';
import { Product, User, SwapRequest, ChatPreview } from './types';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'; 
// --- AUTH IMPORTS ---
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'firebase/auth'; 

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyB1oByjPNmy7KLqrveFLf19R0lv4CE6Zuc", 
    authDomain: "wardrobe-plug-fyp.firebaseapp.com", 
    projectId: "wardrobe-plug-fyp", 
    storageBucket: "wardrobe-plug-fyp.appspot.com", 
    messagingSenderId: "765114897708", 
    appId: "1:765114897708:web:cd02ddd24f472c865b8889", 
    measurementId: "G-FD68JJ870G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

// --- MOCK DATA / TYPES (Existing code, kept for completeness) ---
const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Jeans cool and baggy (fit)', image: 'https://picsum.photos/id/445/300/400', rating: 4.8, size: 'L', description: 'Vintage baggy jeans, barely worn. Super comfortable styling.', owner: 'Ben', ownerId: 'u2' },
    { id: '2', name: 'Vintage Jacket', image: 'https://picsum.photos/id/338/300/400', rating: 4.5, size: 'M', description: 'Classic 90s jacket.', owner: 'Lemmy', ownerId: 'u3' },
]; 

const CURRENT_USER: User = {
    id: 'u1',
    name: 'Riley Brown',
    avatar: 'https://picsum.photos/id/65/150/150',
    swaps: 10,
    followers: 100,
    following: 17
};

// --- SCREENS ---
// (Splash and Welcome screens remain unchanged)
const Splash: React.FC = () => { /* ... existing code ... */ };
const Welcome: React.FC = () => { /* ... existing code ... */ };

// -------------------------------------------------------------------
// 🎯 UPDATED: LOGIN SCREEN
// -------------------------------------------------------------------
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            // Firebase Authentication: Signs in the user
            await signInWithEmailAndPassword(auth, email, password);
            
            // If successful, navigate to the Home Feed
            navigate('/home');

        } catch (err: any) {
            console.error("Login Error:", err);
            // Display user-friendly error message based on Firebase code
            if (err.code === 'auth/invalid-email') {
                setError('Invalid email format.');
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid credentials. Please check your email and password.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full w-full bg-swap-light flex flex-col p-8 pt-12">
            <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-swap-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="font-serif font-bold text-2xl text-swap-dark">S</span>
                </div>
                <h2 className="text-3xl font-serif text-swap-dark">Welcome Back</h2>
            </div>

            <div className="space-y-4">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-swap-green outline-none" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-swap-green outline-none" 
                />
                
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <Button 
                    fullWidth 
                    onClick={handleLogin}
                    disabled={loading || !email || !password}
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </Button>
                
                <div className="flex justify-between items-center text-xs text-gray-500 px-2">
                    <button>Forgot Password?</button>
                    <button onClick={() => navigate('/register')}>Sign up</button>
                </div>
                {/* ... (Social login separators and icons remain the same) ... */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-swap-light text-gray-500">or</span></div>
                </div>

                <div className="flex justify-center space-x-6">
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-lg">G</div>
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-lg text-blue-600">f</div>
                </div>
            </div>
        </div>
    );
};


// -------------------------------------------------------------------
// 🎯 UPDATED: REGISTER SCREEN
// -------------------------------------------------------------------
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleRegister = async () => {
        setError('');
        setLoading(true);
        
        if (!agreedToTerms) {
            setError('You must agree to the T&C.');
            setLoading(false);
            return;
        }

        try {
            // 1. Firebase Authentication: Creates the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // 2. Firestore Write: Create document in 'User' collection
            // NOTE: Firebase Auth handles the password_hash, we store other fields here.
            await setDoc(doc(db, 'User', user.uid), {
                user_id: user.uid,
                username: username, // Uses the separate username field
                email: user.email,
                role: 'user', // Default role for new sign-ups
                is_active: true,
                created_at: new Date().toISOString()
            });

            // 3. Firestore Write: Create document in 'Profile' collection
            await setDoc(doc(db, 'Profile', user.uid), {
                user_id: user.uid, // Use Auth UID as the Profile ID for 1:1 relationship
                display_name: username, 
                bio: '',
                photo_url: '',
                location: ''
            });
            
            navigate('/home'); // Go to home upon successful registration

        } catch (err: any) {
            console.error("Registration Error:", err);
            // Display user-friendly error message
            if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already in use.');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full w-full bg-swap-light flex flex-col p-8 pt-12">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-serif text-swap-dark mb-2">Join Swapism</h2>
                <p className="text-gray-500 text-sm">Try clothes on virtually</p>
            </div>

            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-swap-green outline-none" 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-swap-green outline-none" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-swap-green outline-none" 
                />
                
                <div className="flex items-center space-x-2 px-2">
                    <div 
                        className={`w-4 h-4 rounded-full border cursor-pointer flex items-center justify-center ${agreedToTerms ? 'bg-swap-green border-swap-green' : 'border-gray-400'}`}
                        onClick={() => setAgreedToTerms(!agreedToTerms)}
                    >
                        {agreedToTerms && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-xs text-gray-500">I accept the T&C</span>
                </div>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <Button 
                    fullWidth 
                    onClick={handleRegister}
                    disabled={loading || !email || !password || !username}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <div className="text-center text-xs text-gray-500 mt-2">
                    Already have an account? <button onClick={() => navigate('/login')} className="text-swap-rust">Log in</button>
                </div>

                {/* ... (Social login separators and icons remain the same) ... */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-swap-light text-gray-500">or</span></div>
                </div>

                <div className="flex justify-center space-x-6">
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">G</div>
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"></div>
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-blue-600">f</div>
                </div>
            </div>
        </div>
    );
};

// ... (Other screens like HomeFeed, ProductDetail, etc. follow here)
// ... (Your original HomeFeed, ProductDetail, etc. code goes below the auth screens)

const HomeFeed: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            // Replace 'products' with your actual Firestore collection name if different
            const querySnapshot = await getDocs(collection(db, 'products')); 
            const items: Product[] = [];
            querySnapshot.forEach(doc => {
                // Ensure your Product type matches the structure of your Firestore documents
                items.push({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) } as Product);
            });
            setProducts(items);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-swap-dark">Loading Feed...</div>;
    }
    if (products.length === 0) {
        return <div className="p-8 text-center text-swap-dark">No products found.</div>;
    }

    return (
        <div className="bg-swap-dark h-full pb-24 overflow-y-auto no-scrollbar">
            {/* ... (Header content) ... */}
            <div className="bg-swap-light p-4 rounded-b-3xl sticky top-0 z-10 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-serif font-bold text-xl">SWAPISM</span>
                    <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <span className="text-xs">🔔</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-white border-none focus:ring-1 focus:ring-swap-green outline-none" />
                </div>
            </div>
            
            <div className="p-4">
                 {/* Illustration / Banner */}
                <div className="bg-swap-beige rounded-2xl p-4 flex items-center justify-between mb-4">
                    <div className="w-1/2">
                        <h3 className="font-serif text-lg font-bold mb-1">Swap & Shop</h3>
                        <p className="text-[10px] text-gray-600">Find your perfect style match today.</p>
                    </div>
                    <img src="https://picsum.photos/id/1012/100/100" className="rounded-full w-16 h-16 object-cover border-2 border-white" />
                </div>
                
                <div className="flex justify-between items-center text-white/80 text-xs px-2 mb-2">
                    <button className="flex items-center space-x-1"><Filter size={12}/> <span>Filter</span></button>
                    <button className="flex items-center space-x-1"><ArrowLeftRight size={12}/> <span>Sort By</span></button>
                </div>

                {/* Grid - NOW USES FETCHED PRODUCTS */}
                <div className="grid grid-cols-2 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm relative group" onClick={() => navigate(`/product/${product.id}`)}>
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                                <button className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500">
                                    <Heart size={14} />
                                </button>
                            </div>
                            <div className="p-3">
                                <h4 className="font-serif text-sm font-semibold truncate text-swap-dark">{product.name}</h4>
                                <div className="flex items-center text-[10px] text-gray-500 mb-2">
                                    <span>User's Rating:</span>
                                    <span className="text-yellow-500 ml-1">★ {product.rating || 0}</span>
                                    <span className="ml-1">(10)</span>
                                </div>
                                <Button variant="primary" className="py-1 px-0 w-full text-xs h-8">Swap Now</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get ID from URL
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async (productId: string) => {
        try {
            const docRef = doc(db, 'products', productId); // Replace 'products'
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) } as Product);
            } else {
                console.log("No such document!");
                setProduct(null);
            }
        } catch (error) {
            console.error("Error fetching product: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading product details...</div>;
    if (!product) return <div className="p-8 text-center">Product not found.</div>;

    return (
        <div className="bg-white h-full pb-20 overflow-y-auto relative">
             <div className="absolute top-4 left-4 z-10">
                 <button onClick={() => navigate(-1)} className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                     <ChevronLeft size={20} />
                 </button>
             </div>

             <div className="h-2/3 relative bg-gray-100">
                 <img src={product.image} className="w-full h-full object-cover" />
                 <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded">photo 1/3</div>
             </div>

             <div className="p-6 -mt-6 bg-white rounded-t-3xl relative z-0 min-h-[40%] shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                 <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
                 
                 <h2 className="font-serif text-2xl text-swap-dark mb-4">{product.name}</h2>
                 
                 <div className="mb-6">
                     <h3 className="font-bold text-sm mb-2">Size</h3>
                     <span className="inline-block border border-swap-dark rounded px-3 py-1 text-sm font-medium">{product.size}</span>
                 </div>

                 <div className="mb-8">
                     <h3 className="font-bold text-sm mb-2">Description</h3>
                     <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                 </div>

                 <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                     <div className="flex items-center space-x-2">
                         <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                             <img src={`https://ui-avatars.com/api/?name=${product.owner}`} alt="owner" />
                         </div>
                         <span className="text-xs font-medium">{product.owner}</span>
                     </div>
                     <div className="flex space-x-4 text-gray-400">
                         <Repeat size={20} className="hover:text-swap-green cursor-pointer"/>
                         <MessageCircle size={20} className="hover:text-swap-green cursor-pointer" onClick={() => navigate('/messages')}/>
                         <Heart size={20} className="hover:text-red-500 cursor-pointer"/>
                     </div>
                 </div>
             </div>
        </div>
    );
};

// (Other screens remain largely unchanged, assuming they don't need Firebase data yet)

const SwapPage: React.FC = () => {
    // ... (SwapPage content) ...
    const [activeTab, setActiveTab] = useState<'requests' | 'completed'>('requests');

    return (
        <div className="bg-white h-full pb-20 flex flex-col">
            <div className="bg-swap-light p-4 pb-2 shadow-sm z-10">
                <div className="flex justify-center items-center mb-4 relative">
                    <span className="font-serif text-lg font-bold">Swap requests</span>
                    <div className="absolute right-0">
                       <SlidersHorizontal size={18} className="text-gray-500" />
                    </div>
                </div>
                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="text" className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-white border border-gray-100 outline-none" />
                </div>
                
                {/* Tabs */}
                <div className="flex text-sm font-medium border-b border-gray-200">
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`flex-1 pb-2 border-b-2 ${activeTab === 'requests' ? 'border-swap-rust text-swap-dark' : 'border-transparent text-gray-400'}`}
                    >
                        Requests
                    </button>
                    <button 
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 pb-2 border-b-2 ${activeTab === 'completed' ? 'border-swap-rust text-swap-dark' : 'border-transparent text-gray-400'}`}
                    >
                        Completed / Receive
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {activeTab === 'requests' ? (
                     <div className="space-y-4">
                         <div className="text-xs text-gray-500 text-center mb-2">Request sent</div>
                         <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                             <div className="flex items-center space-x-3">
                                 <img src="https://ui-avatars.com/api/?name=Ben" className="w-10 h-10 rounded-full" />
                                 <div className="flex flex-col">
                                     <span className="text-sm font-bold">Ben</span>
                                     <span className="text-[10px] text-gray-500">2 mins ago</span>
                                 </div>
                             </div>
                             <div className="flex space-x-2">
                                 <button className="px-3 py-1 bg-swap-green/20 text-swap-green text-[10px] rounded-full">view</button>
                                 <button className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] rounded-full">delete</button>
                             </div>
                         </div>
                         <div className="border border-swap-beige p-4 rounded-xl relative">
                             <img src="https://picsum.photos/id/445/200/200" className="w-full h-32 object-cover rounded-lg mb-2" />
                             <div className="flex justify-center space-x-2 mt-2">
                                  <div className="bg-swap-green w-8 h-8 rounded-full flex items-center justify-center text-white"><Check size={16}/></div>
                                  <div className="bg-red-400 w-8 h-8 rounded-full flex items-center justify-center text-white"><X size={16}/></div>
                              </div>
                              <div className="text-center mt-2 text-xs">
                                  You've <span className="text-swap-rust underline">accepted</span> the swap
                              </div>
                         </div>
                     </div>
                ) : (
                    <div className="space-y-4">
                         <div className="flex justify-between px-4 text-xs font-bold text-gray-600 mb-2">
                             <span>Completed</span>
                             <span>To Receive</span>
                         </div>
                         <div className="bg-swap-beige/30 p-4 rounded-xl border border-swap-beige">
                             <div className="flex items-center justify-between mb-3">
                                 <div className="flex items-center space-x-2">
                                     <img src="https://ui-avatars.com/api/?name=Jenny" className="w-6 h-6 rounded-full"/>
                                     <span className="text-xs font-bold">Jenny</span>
                                 </div>
                                 <span className="px-2 py-1 bg-swap-green/20 text-swap-green text-[10px] rounded">View</span>
                             </div>
                             <div className="flex space-x-3">
                                 <img src="https://picsum.photos/id/1/100/100" className="w-16 h-20 object-cover rounded" />
                                 <div className="flex flex-col justify-center">
                                     <span className="font-serif text-sm">Baggy Jeans</span>
                                     <span className="text-[10px] text-gray-500">Size: 32</span>
                                     <span className="text-[10px] text-gray-500">Condition: New</span>
                                 </div>
                             </div>
                             <div className="text-right mt-2 text-[10px] text-swap-rust">Completed on 11.11.2023</div>
                         </div>
                     </div>
                )}
            </div>
        </div>
    );
};

const Messages: React.FC = () => {
    // ... (Messages content) ...
    const navigate = useNavigate();
    return (
        <div className="bg-white h-full pb-20 flex flex-col">
             <div className="bg-swap-light p-4 shadow-sm z-10 flex items-center justify-between">
                 <button onClick={() => navigate(-1)}><ChevronLeft size={24} /></button>
                 <span className="font-serif text-lg font-bold">Messages</span>
                 <SlidersHorizontal size={20} className="text-gray-500" />
             </div>
              <div className="p-4 bg-swap-light/50">
                 <div className="relative">
                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                     <input type="text" className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-white border border-gray-100 outline-none" />
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto no-scrollbar">
                 {[
                     {name: 'Ben', msg: '3 new messages', time: '10m', img: 'https://ui-avatars.com/api/?name=Ben'},
                     {name: 'Lemmy', msg: '1 new messages', time: '4h', img: 'https://ui-avatars.com/api/?name=Lemmy'}
                 ].map((chat, i) => (
                     <div key={i} onClick={() => navigate(`/chat/${chat.name}`)} className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                         <div className="relative">
                             <img src={chat.img} className="w-12 h-12 rounded-full object-cover" />
                             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                         </div>
                         <div className="ml-4 flex-1">
                             <div className="flex justify-between items-baseline">
                                 <span className="font-bold text-sm text-swap-dark">{chat.name}</span>
                                 <span className="text-[10px] text-gray-400">{chat.time}</span>
                             </div>
                             <span className="text-xs text-gray-500 font-medium">{chat.msg}</span>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

const Chat: React.FC = () => {
    // ... (Chat content) ...
    const navigate = useNavigate();
    return (
        <div className="bg-white h-full pb-20 flex flex-col">
             <div className="bg-swap-light p-4 shadow-sm z-10 flex items-center justify-between">
                 <div className="flex items-center">
                     <button onClick={() => navigate(-1)} className="mr-2"><ChevronLeft size={24} /></button>
                     <img src="https://ui-avatars.com/api/?name=Ben" className="w-8 h-8 rounded-full mr-2" />
                     <span className="font-serif font-bold">Ben</span>
                 </div>
                 <div className="flex space-x-3 text-gray-500">
                     <span className="text-xs">📞</span>
                 </div>
             </div>

             <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                 <div className="text-center text-[10px] text-gray-400 mb-4">request sent</div>
                 
                 {/* Product Card in Chat */}
                 <div className="flex justify-end mb-4">
                     <div className="bg-swap-beige p-2 rounded-xl rounded-tr-none max-w-[70%]">
                         <img src="https://picsum.photos/id/445/150/150" className="w-full h-32 object-cover rounded-lg mb-2" />
                         <div className="flex justify-between text-xs font-bold text-swap-dark">
                              <span>Cool Jeans</span>
                         </div>
                     </div>
                 </div>

                 <div className="flex justify-start mb-2">
                     <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none max-w-[70%] text-xs shadow-sm">
                         Condition?
                     </div>
                 </div>

                 <div className="flex justify-end mb-2">
                     <div className="bg-swap-light p-3 rounded-xl rounded-tr-none max-w-[70%] text-xs text-right">
                         Wore twice
                     </div>
                 </div>
                 
                 <div className="text-center text-[10px] text-red-400 my-4">Ben rejected the swap</div>
             </div>

             <div className="p-3 bg-white border-t border-gray-100 flex items-center">
                 <input type="text" placeholder="message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none" />
                 <button className="ml-2 w-8 h-8 bg-swap-green rounded-full flex items-center justify-center text-white shadow">
                     <span className="text-xs">➤</span>
                 </button>
             </div>
        </div>
    )
}

const Favourites: React.FC = () => {
    // ... (Favourites content) ...
    // NOTE: This should also fetch data from a Firestore 'favourites' collection tied to CURRENT_USER.id
    return (
        <div className="bg-white h-full pb-20">
             <div className="bg-swap-light p-4 shadow-sm z-10">
                 <div className="flex justify-between items-center">
                     <span className="font-serif text-lg font-bold">Favourite</span>
                     <SlidersHorizontal size={18} className="text-gray-500" />
                 </div>
             </div>
             <div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto h-[calc(100%-60px)] no-scrollbar">
                 {MOCK_PRODUCTS.slice(0, 3).map(p => (
                     <div key={p.id} className="relative">
                         <img src={p.image} className="w-full h-48 object-cover rounded-xl" />
                          <button className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-red-500">
                               <Heart size={14} fill="currentColor" />
                          </button>
                     </div>
                 ))}
             </div>
        </div>
    )
}

const Profile: React.FC = () => {
    // ... (Profile content) ...
    // NOTE: This should fetch the user's products from Firestore where ownerId == CURRENT_USER.id
    const navigate = useNavigate();
    const [tab, setTab] = useState<'closet'|'posts'>('closet');

    return (
        <div className="bg-swap-light h-full pb-20 overflow-y-auto no-scrollbar">
            <div className="bg-swap-green p-4 pb-12 rounded-b-[40px] relative">
                <div className="flex justify-between text-white mb-4">
                    <button onClick={() => navigate(-1)}><ChevronLeft /></button>
                    <span className="font-serif font-bold">PROFILE</span>
                    <button onClick={() => navigate('/settings')}><SettingsIcon size={20}/></button>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-2">
                        <img src={CURRENT_USER.avatar} alt="Profile" />
                    </div>
                    <h2 className="font-serif font-bold text-white text-lg">{CURRENT_USER.name}</h2>
                    <span className="text-white/80 text-xs">@rileyB</span>
                    
                    <div className="flex space-x-8 mt-4 text-white">
                        <div className="text-center">
                            <div className="font-bold">{CURRENT_USER.swaps}</div>
                            <div className="text-[10px] uppercase opacity-80">swaps</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold">{CURRENT_USER.followers}</div>
                            <div className="text-[10px] uppercase opacity-80">followers</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold">{CURRENT_USER.following}</div>
                            <div className="text-[10px] uppercase opacity-80">following</div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 w-full px-8">
                        <Button className="flex-1 bg-white text-swap-green py-2 text-xs font-bold hover:bg-gray-100">Edit Profile</Button>
                        <Button className="flex-1 bg-swap-mustard text-swap-dark py-2 text-xs font-bold hover:bg-opacity-80">Share Profile</Button>
                    </div>
                </div>
            </div>

            <div className="px-4 mt-4">
                <div className="bg-white rounded-xl p-3 shadow-sm mb-4">
                    <h3 className="font-bold text-xs mb-2">Discover closets</h3>
                    <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
                        {[1,2,3].map(i => (
                            <img key={i} src={`https://picsum.photos/id/${100+i}/80/80`} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        ))}
                    </div>
                </div>
                
                <div 
                    onClick={() => navigate('/mirror')}
                    className="bg-swap-mustard/20 border border-swap-mustard rounded-xl p-3 mb-4 flex items-center justify-between cursor-pointer"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-swap-mustard rounded-full flex items-center justify-center text-white">
                            <UserIcon size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-swap-dark">Magic Mirror</h3>
                            <p className="text-[10px] text-gray-500">Mix & match your favorites</p>
                        </div>
                    </div>
                    <ChevronLeft className="rotate-180 text-gray-400" size={20} />
                </div>

                <div className="flex border-b border-gray-200 mb-4">
                    <button onClick={() => setTab('closet')} className={`flex-1 pb-2 text-sm font-bold ${tab === 'closet' ? 'text-swap-dark border-b-2 border-swap-dark' : 'text-gray-400'}`}>Closet</button>
                    <button onClick={() => setTab('posts')} className={`flex-1 pb-2 text-sm font-bold ${tab === 'posts' ? 'text-swap-dark border-b-2 border-swap-dark' : 'text-gray-400'}`}>Posts</button>
                </div>

                <div className="grid grid-cols-3 gap-2 pb-8">
                    {tab === 'closet' ? (
                         MOCK_PRODUCTS.map(p => (
                             <img key={p.id} src={p.image} className="w-full aspect-square object-cover rounded bg-gray-200" />
                         ))
                    ) : (
                        [10,11,12,13,14].map(i => (
                            <div key={i} className="relative group">
                                <img src={`https://picsum.photos/id/${200+i}/200/200`} className="w-full aspect-square object-cover rounded bg-gray-200" />
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100">
                                    <Heart size={12} className="text-white fill-white"/>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// (Settings and Mirror screens remain unchanged)

const Settings: React.FC = () => {
    // ... (Settings content) ...
    const navigate = useNavigate();
    const settingsItems = [
        { label: 'Notification', icon: '🔔' },
        { label: 'Activity', icon: '⚡' },
        { label: 'Blocked', icon: '🚫' },
        { label: 'Comment', icon: '💬' },
        { label: 'Help Center', icon: '❓' },
        { label: 'About', icon: 'ℹ️' },
    ];
    
    return (
        <div className="bg-white h-full pb-20">
            <div className="bg-swap-light p-4 shadow-sm z-10 flex items-center justify-between">
                <button onClick={() => navigate(-1)}><ChevronLeft size={24} /></button>
                <span className="font-serif text-lg font-bold">Settings</span>
                <div className="w-6"></div>
            </div>
            
            <div className="p-4">
                 <div className="relative mb-6">
                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                     <input type="text" className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-50 outline-none" placeholder="Search settings" />
                 </div>

                 <div className="space-y-1">
                     {settingsItems.map((item, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                             <div className="flex items-center space-x-3">
                                 <span className="text-sm">{item.icon}</span>
                                 <span className="text-sm font-medium text-gray-700">{item.label}</span>
                             </div>
                             <ChevronLeft size={16} className="rotate-180 text-gray-300" />
                         </div>
                     ))}
                 </div>

                 <div className="mt-8 pt-4 border-t border-gray-100">
                     <div className="text-xs font-bold text-gray-400 mb-2 px-4">Login info</div>
                     <button onClick={() => navigate('/welcome')} className="w-full text-left px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 rounded-lg flex items-center">
                         <LogOut size={16} className="mr-2"/> Log out
                     </button>
                 </div>
            </div>
        </div>
    );
};

const Mirror: React.FC = () => {
    // ... (Mirror content) ...
    const navigate = useNavigate();
    const [topIdx, setTopIdx] = useState(0);
    const [bottomIdx, setBottomIdx] = useState(0);

    const tops = [
        'https://picsum.photos/id/338/200/200',
        'https://picsum.photos/id/64/200/200',
        'https://picsum.photos/id/177/200/200'
    ];
    const bottoms = [
        'https://picsum.photos/id/445/200/200',
        'https://picsum.photos/id/103/200/200',
        'https://picsum.photos/id/22/200/200'
    ];

    const nextTop = () => setTopIdx((p) => (p + 1) % tops.length);
    const prevTop = () => setTopIdx((p) => (p - 1 + tops.length) % tops.length);
    const nextBot = () => setBottomIdx((p) => (p + 1) % bottoms.length);
    const prevBot = () => setBottomIdx((p) => (p - 1 + bottoms.length) % bottoms.length);

    return (
        <div className="bg-swap-dark h-full pb-20 overflow-hidden relative">
            <div className="bg-swap-green p-4 flex justify-between items-center text-white">
                <button onClick={() => navigate(-1)}><ChevronLeft /></button>
                <span className="font-serif font-bold">MIRROR</span>
                <Share2 size={20}/>
            </div>

            <div className="h-[calc(100%-80px)] flex flex-col items-center justify-center p-4 relative">
                 {/* Mirror Frame */}
                 <div className="w-64 h-[400px] bg-swap-light rounded-[100px] border-8 border-swap-beige shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
                      {/* Avatar/Mannequin Base */}
                      <div className="absolute inset-0 bg-white/50 z-0"></div>
                      
                      {/* Top Selection */}
                      <div className="z-10 relative mb-[-10px] group">
                          <img src={tops[topIdx]} className="w-32 h-32 object-cover rounded-full clip-path-shirt" style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'}} />
                          <button onClick={prevTop} className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1"><ChevronLeft size={12}/></button>
                          <button onClick={nextTop} className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1 rotate-180"><ChevronLeft size={12}/></button>
                      </div>

                      {/* Bottom Selection */}
                      <div className="z-10 relative group">
                          <img src={bottoms[bottomIdx]} className="w-32 h-40 object-cover rounded-lg" style={{clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'}} />
                          <button onClick={prevBot} className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1"><ChevronLeft size={12}/></button>
                          <button onClick={nextBot} className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1 rotate-180"><ChevronLeft size={12}/></button>
                      </div>
                      
                      {/* Shoes (Static) */}
                      <div className="z-10 mt-[-5px] flex space-x-2">
                           <div className="w-8 h-4 bg-black rounded-b-lg"></div>
                           <div className="w-8 h-4 bg-black rounded-b-lg"></div>
                      </div>
                 </div>
                 
                 <div className="mt-8 flex space-x-4">
                      <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white mb-1"><div className="w-4 h-4 bg-swap-mustard rounded"></div></div>
                          <span className="text-[10px] text-white">Top</span>
                      </div>
                      <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white mb-1"><div className="w-4 h-8 bg-blue-400 rounded"></div></div>
                          <span className="text-[10px] text-white">Btm</span>
                      </div>
                 </div>
                 
                 <button className="mt-6 bg-swap-mustard text-swap-dark font-bold py-2 px-8 rounded-full shadow-lg text-sm flex items-center">
                      <Camera size={16} className="mr-2"/> Snapshot
                 </button>
            </div>
        </div>
    )
}

// --- MAIN APP ---

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans">
            <div className="w-full max-w-md h-[850px] max-h-screen bg-white relative shadow-2xl overflow-hidden sm:rounded-[40px] border-4 border-gray-800">
                {/* Dynamic Notch (Visual Only) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-50 pointer-events-none"></div>
                
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Splash />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<HomeFeed />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/swap" element={<SwapPage />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/chat/:userId" element={<Chat />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/mirror" element={<Mirror />} />
                    </Routes>
                    {/* BottomNav should only show on main screens */}
                    <Routes>
                        <Route path="/home" element={<BottomNav />} />
                        <Route path="/swap" element={<BottomNav />} />
                        <Route path="/messages" element={<BottomNav />} />
                        <Route path="/favourites" element={<BottomNav />} />
                        <Route path="/profile" element={<BottomNav />} />
                    </Routes>
                </HashRouter>
            </div>
        </div>
    );
};

export default App;