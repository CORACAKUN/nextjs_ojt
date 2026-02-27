import Button from "@/components/Button";

type CardProps = {
    title: string;
    description: string;
    image: string;
};

export default function Card({title, description, image}: CardProps){
    return (
        <div className="p-8 rounded-2xl shadow-2xl flex flex-col gap-2 backdrop-blur-sm bg-black/30 border border-white/50">
            <img src={image} alt={title} className=" w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300" />
            <h2 className="font-bold text-center text-xl text-white">{title}</h2>
            <p className="text-white text-justify">{description}</p>
            {/* <Button /> */}
        </div>
    );
}