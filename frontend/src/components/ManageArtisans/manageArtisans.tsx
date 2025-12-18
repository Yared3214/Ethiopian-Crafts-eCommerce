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
  
    return (
      <div>
        <UserManager onToggleActivate={toggleActivateArtisanHandler} role="artisan" users={artisans} />
      </div>
    );
  }