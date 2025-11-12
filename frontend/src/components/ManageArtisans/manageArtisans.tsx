import { useEffect } from "react";
import UserManager from "../UserManager/userManager";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useArtisan from "@/hooks/useArtisan";

// ManageArtisans.tsx
export default function ManageArtisans() {
    const { fetchAllArtisans, toggleActivateArtisanHandler, loading, error } = useArtisan();
    const artisans = useSelector((state: RootState) => state.artisan.artisans);
  
    useEffect(() => {
      if (!artisans || artisans.length === 0) {
        fetchAllArtisans();
      }
    }, [artisans, fetchAllArtisans]);
  
    if (loading) return <div className="p-6">Loading artisans...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  
    return (
      <div>
        <UserManager onToggleActivate={toggleActivateArtisanHandler} role="artisan" users={artisans} />
      </div>
    );
  }