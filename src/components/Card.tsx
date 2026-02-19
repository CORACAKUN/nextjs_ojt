import Button from "@/components/Button";

type CardProps = {
    title: string;
    description: string;
};

export default function Card({title, description}: CardProps){
    return (
        <div className="p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
            <h2 className="font-bold text-center text-xl">{title}</h2>
            <p className="text-gray-500 text-justify">{description}</p>
            <Button />
        </div>
    );
}