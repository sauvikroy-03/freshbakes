'use client'
import { useState } from "react";
import { Upload } from "lucide-react";


const flavors = [
  "Chocolate",
  "Vanilla",
  "Strawberry",
  "Red Velvet",
  "Butterscotch",
  "Pineapple",
  "Blueberry",
  "Black Forest",
  "Mango",
  "Coffee",
];



const weights = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "3 kg", "5 kg"];

const CustomCake = () => {
const [eggless, setEggless] = useState(false);
const [fileName, setFileName] = useState("");
const [name, setName] = useState<string>("");
const [phone, setPhone] = useState<string>("");
const [flavor, setFlavor] = useState("");
const [weight, setWeight] = useState("");
const [message, setMessage] = useState("");



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("flavor", flavor);
    formData.append("weight", weight);
    formData.append("eggless", eggless ? "yes" : "no");
    formData.append("message", message);
    
    const whatsappMessage=`
    *New Custom Cake Request:*
    Name: ${name}
    Phone: ${phone}
    Flavor: ${flavor}
    Weight: ${weight}
    Type: ${eggless ? "Eggless" : "Egg"}
    Message: ${message}
    ${fileName ? `Reference Image: ${fileName}` : ""}
    `
    const encodedMessage=encodeURIComponent(whatsappMessage);
    const whatsappURL=`https://wa.me/917086396368?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

  }
    // Here you would typically handle form submission, e.g., send data to your backend 

  return (
    <section id="custom-cake" className="section-padding bg-background py-12 px-7 ">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-2">
            Your Vision, Our Creation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Custom Cake
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tell us what you dream of, and we&apos;ll bake it into reality.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5 bg-card rounded-2xl p-6 sm:p-10 shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="bakery-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="bakery-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Cake Flavor
              </label>
              <select className="bakery-input appearance-none cursor-pointer" value={flavor} onChange={(e) => setFlavor(e.target.value)}>
                <option value="">Select flavor</option>
                {flavors.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Weight
              </label>
              <select value={weight} onChange={(e) => setWeight(e.target.value)} className="bakery-input appearance-none cursor-pointer">
                <option value="">Select weight</option>
                {weights.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Egg / Eggless toggle */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Type
            </label>
            <div className="text-white flex rounded-xl overflow-hidden border border-input w-fit">
              <button
                type="button"
                onClick={() => setEggless(false)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  !eggless
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Egg
              </button>
              <button
                type="button"
                onClick={() => setEggless(prev=>!prev)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  eggless
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Eggless
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Custom Message on Cake
            </label>
            <textarea
              placeholder="e.g., Happy Birthday Priya!"
              rows={3}
              className="bakery-input resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Reference Image (optional)
            </label>
            <label className="flex items-center gap-3 bakery-input cursor-pointer hover:border-primary/50">
              <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground text-sm truncate">
                {fileName || "Upload an image for reference"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button type="button" onClick={handleSubmit} className="bakery-btn w-full text-base mt- text-white">
            Share My Vision <Upload/>
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomCake;
