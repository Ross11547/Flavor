import Icon from "../../icons/icon";


const Nothing = ({ text }) => {
  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
      <div className="w-12 aspect-square text-primary-600">
        <Icon type="empty" />
      </div>
      <p className="font-semibold text-primary-800">
        {text || "No hay datos aquí..."}
      </p>
    </div>
  );
};

export default Nothing;
