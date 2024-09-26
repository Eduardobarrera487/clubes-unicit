// components/AnnouncementCard.jsx
const AnnouncementCard = ({ announcement }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-800">{announcement.Name}</h2>
        <p className="text-gray-600 mt-2">{announcement.Description}</p>
      </div>
    );
  };
  
  export default AnnouncementCard;
  