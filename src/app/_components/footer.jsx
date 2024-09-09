
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 ">
      <div className="container mx-auto ">
        <h2 className="text-3xl font-medium mb-4 text-[#274790]">Mantente en contacto</h2>
        <p className="text-gray-700 mb-3 text-xl w-1/2 font-normal">
          Copyright © Universidad Iberoamericana de Ciencia y Tecnología (UNICIT) - Rotonda Universitaria, 100 mts. al Sur. Managua, Nicaragua.
        </p>
        <a href="https://unicit.edu.ni" className="text-blue-500 hover:underline text-xl">
          https://unicit.edu.ni
        </a>
        <p className="mt-2 text-[#274790] mb-2 text-xl hover:underline"><a href="tel:+50522787311">(+505) 2278-7311</a></p>
        <a className="text-[#274790] text-xl hover:underline" href="mailto:unicit@unicit.edu.ni">
        unicit@unicit.edu.ni
        </a>
      </div>
    </footer>
  );
};

export default Footer;
