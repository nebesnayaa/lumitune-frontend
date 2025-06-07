import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

import { Playlist } from "../types/HomeContentData";
import { useAuth } from "../context/AuthContext";
import { getPlaylistsByUserId } from "../api/contentService";
import { getUserByUsername } from "../api/userService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../styles/SideBar.module.css";

const Sidebar: React.FC = () => {
	const { user } = useAuth();
	const [ playlists, setPlaylists ] = useState<Playlist[] | null>(null);
	
	const [sortedPlaylists, setSortedPlaylists] = useState<Playlist[] | null>(null);
	const [ filterSelected, setFilterSelected] = useState<"default" | "alphabet">("default");
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLSpanElement>(null);

	const toggleDropdown = () => setShowDropdown((prev) => !prev);
	
	const handleSelect = (option: "default" | "alphabet", event: React.MouseEvent) => {
		event.stopPropagation();
		setFilterSelected(option);
		setShowDropdown(false);
	};

	useEffect(() => {   // Закрити меню, якщо клік поза ним
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				toggleRef.current &&
				!toggleRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(()=> {
		if(!user) return;
		const fetchPlaylists = async() => {
			const userId = await getUserByUsername(user.username);
			const playlists = await getPlaylistsByUserId(userId.id);
			setPlaylists(playlists);
		}
		fetchPlaylists();
	}, [user]);

	useEffect(() => {  // Сортування плейлістів
		if (!playlists) return;

		let sorted = [...playlists];

		if (filterSelected === "alphabet") {
			sorted.sort((a, b) => a.name.localeCompare(b.name));
		}
		// default — залишається порядок як є (останні додані)

		setSortedPlaylists(sorted);
	}, [filterSelected, playlists]);

	return (
		<aside className={styles.sidebar}>
			<h3 className={styles.menuTitle}>Меню</h3>
			<nav className={styles.menuSection}>
				<NavLink to="/" className={({ isActive }) => isActive 
						? `${styles.menuItem} ${styles.active}` 
						: styles.menuItem}>
					<svg className={styles.homeIcon} width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.3673 19.9999H9.5L18.1879 19.5427C18.6609 19.5178 19.0516 19.1643 19.1237 18.6961L19.8899 13.7153C19.9556 13.2884 20.2879 12.9519 20.7139 12.8809L21.6645 12.7225C22.3281 12.6119 22.6954 11.8907 22.3945 11.2889L21.1014 8.7028C21.0347 8.56925 20.9388 8.45234 20.821 8.36067L12.5563 1.93258C12.2227 1.67312 11.762 1.65138 11.4055 1.87827L6.64399 4.90829C6.54869 4.96894 6.46435 5.0453 6.39455 5.13413L1.8252 10.9497C1.41288 11.4744 1.62049 12.2481 2.24012 12.496L2.9632 12.7852C3.29531 12.918 3.53118 13.2182 3.58176 13.5723L4.37735 19.1413C4.44772 19.634 4.86964 19.9999 5.3673 19.9999Z" fill="url(#paint0_linear_35_157)"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3528 1.21732C11.3336 0.546595 12.6665 0.546597 13.6474 1.21734L14.785 1.99528C18.1464 4.29405 21.0322 7.11769 23.3035 10.3372L23.6683 10.8546C24.1149 11.4875 24.0833 12.2494 23.7351 12.8199C23.3943 13.3783 22.7714 13.7353 22.0654 13.7353H21.0926C21.1438 15.3265 21.054 17.2359 20.8188 18.6104C20.5419 20.229 19.0452 21.2857 17.4519 21.2857H6.54819C4.9549 21.2857 3.45819 20.229 3.18134 18.6104C2.94624 17.2359 2.85638 15.3265 2.90755 13.7353H1.93454C1.22858 13.7353 0.60559 13.3783 0.264789 12.8199C-0.083453 12.2494 -0.114946 11.4875 0.331587 10.8545L0.696586 10.3371C2.96774 7.11765 5.85355 4.29407 9.21504 1.99537L10.3528 1.21732ZM12.4378 2.98615C12.1862 2.81413 11.8139 2.81413 11.5624 2.98615L10.4246 3.76418C7.26598 5.92418 4.56603 8.56934 2.44761 11.5724L2.43341 11.5925H4.04366C4.34477 11.5925 4.63198 11.7192 4.83497 11.9415C5.03798 12.1639 5.13804 12.4615 5.11065 12.7613C4.96807 14.3227 5.03199 16.7202 5.29353 18.2492C5.36789 18.6839 5.8338 19.1429 6.54819 19.1429H8.71248V15.003C8.71248 13.1875 10.1843 11.7157 11.9998 11.7157C13.8153 11.7157 15.2871 13.1875 15.2871 15.003V19.1429H17.4519C18.1663 19.1429 18.6322 18.6839 18.7066 18.2492C18.9682 16.7202 19.0322 14.3227 18.8895 12.7613C18.8621 12.4615 18.9622 12.1639 19.1652 11.9415C19.3682 11.7192 19.6553 11.5925 19.9565 11.5925H21.5666L21.5523 11.5724C19.434 8.56936 16.734 5.92415 13.5754 3.7641L12.4378 2.98615Z" fill="#F0F0F0"/>
						<defs>
						<linearGradient id="paint0_linear_35_157" x1="12" y1="1.49992" x2="12" y2="19.9999" gradientUnits="userSpaceOnUse">
						<stop stop-color="#204A79"/>
						<stop offset="1" stop-color="#204F79" stop-opacity="0"/>
						</linearGradient>
						</defs>
					</svg>
					<p className={styles.itemName}>Головна</p>
				</NavLink>
				<NavLink to="/mediateka" className={({ isActive }) => isActive 
						? `${styles.menuItem} ${styles.active}` 
						: styles.menuItem}>
					<svg className={styles.mediaIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 20C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1V19C2 19.2652 1.89464 19.5196 1.70711 19.7071C1.51957 19.8946 1.26522 20 1 20ZM13.5 0.134C13.348 0.0462328 13.1755 2.66256e-05 13 2.55108e-05C12.8245 2.43959e-05 12.652 0.0462283 12.5 0.133994C12.348 0.221759 12.2218 0.347993 12.134 0.500009C12.0462 0.652025 12 0.824466 12 1V19C12 19.2652 12.1054 19.5196 12.2929 19.7071C12.4804 19.8946 12.7348 20 13 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V4.464C20 4.28847 19.9538 4.11603 19.866 3.96401C19.7782 3.812 19.652 3.68577 19.5 3.598L13.5 0.134ZM7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20C7.26522 20 7.51957 19.8946 7.70711 19.7071C7.89464 19.5196 8 19.2652 8 19V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0Z" fill="#F0F0F0"/>
					</svg>
					<p className={styles.itemName}>Моя медіатека</p>
				</NavLink>
			</nav>
			
			<div className={styles.horizontalLine}></div>

			<h4 className={styles.sectionTitle}>Плейлисти</h4>
			<nav className={styles.menuSection}>
				<NavLink to="/favorite" className={({ isActive }) => isActive 
						? `${styles.menuItem} ${styles.active}` 
						: styles.menuItem}>
					<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.5 18.2236L12 20.2236L9 18.7236L5.5 16.2236L3.5 12.7236L2.5 8.22363L5 4.22363H9L12 5.72363L14 4.72363L17 3.72363L20 5.72363L21.5 8.72363L20.5 13.2236L15.5 18.2236Z" fill="url(#paint0_linear_1644_4096)" fill-opacity="0.8"/>
						<path d="M12 6.13058L11.4934 6.61817C11.6259 6.75588 11.8088 6.83371 12 6.83371C12.1912 6.83371 12.3741 6.75588 12.5066 6.61817L12 6.13058ZM9.58692 18.1505C8.16599 17.0303 6.61225 15.9365 5.37965 14.5485C4.17114 13.1877 3.32812 11.5998 3.32812 9.53976H1.92188C1.92188 12.0387 2.96297 13.945 4.32817 15.4823C5.66927 16.9924 7.37885 18.2005 8.71633 19.2549L9.58692 18.1505ZM3.32812 9.53976C3.32812 7.52332 4.46753 5.83235 6.02284 5.12142C7.53382 4.43074 9.56406 4.61365 11.4934 6.61817L12.5066 5.64299C10.2173 3.26454 7.56008 2.87253 5.43821 3.84244C3.36067 4.7921 1.92188 6.9972 1.92188 9.53976H3.32812ZM8.71633 19.2549C9.19655 19.6334 9.71207 20.0371 10.2345 20.3424C10.7568 20.6476 11.3527 20.8956 12 20.8956V19.4893C11.7098 19.4893 11.3682 19.3762 10.944 19.1283C10.52 18.8805 10.0801 18.5393 9.58692 18.1505L8.71633 19.2549ZM15.2837 19.2549C16.6211 18.2005 18.3307 16.9924 19.6718 15.4823C21.037 13.945 22.0781 12.0387 22.0781 9.53976H20.6719C20.6719 11.5998 19.8289 13.1877 18.6203 14.5485C17.3877 15.9365 15.834 17.0303 14.4131 18.1505L15.2837 19.2549ZM22.0781 9.53976C22.0781 6.9972 20.6393 4.7921 18.5618 3.84244C16.4399 2.87253 13.7827 3.26454 11.4934 5.64299L12.5066 6.61817C14.4359 4.61365 16.4662 4.43074 17.9771 5.12142C19.5324 5.83235 20.6719 7.52332 20.6719 9.53976H22.0781ZM14.4131 18.1505C13.9199 18.5393 13.48 18.8805 13.056 19.1283C12.6318 19.3762 12.2902 19.4893 12 19.4893V20.8956C12.6473 20.8956 13.2432 20.6476 13.7655 20.3424C14.288 20.0371 14.8034 19.6334 15.2837 19.2549L14.4131 18.1505Z" fill="#F0F0F0"/>
						<defs>
							<linearGradient id="paint0_linear_1644_4096" x1="12" y1="3.72363" x2="12" y2="20.2236" gradientUnits="userSpaceOnUse">
							<stop stop-color="#205579"/>
							<stop offset="1" stop-color="#205579" stop-opacity="0.31"/>
							</linearGradient>
						</defs>
					</svg>
					<p className={styles.itemName}>Улюблені треки</p>
				</NavLink>
				<NavLink to="/create-playlist" className={({ isActive }) => isActive 
						? `${styles.menuItem} ${styles.active}` 
						: styles.menuItem}>
					<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6.22363C2.25 5.80942 2.58579 5.47363 3 5.47363H20C20.4142 5.47363 20.75 5.80942 20.75 6.22363C20.75 6.63784 20.4142 6.97363 20 6.97363H3C2.58579 6.97363 2.25 6.63784 2.25 6.22363ZM2.25 11.2236C2.25 10.8094 2.58579 10.4736 3 10.4736H10C10.4142 10.4736 10.75 10.8094 10.75 11.2236C10.75 11.6378 10.4142 11.9736 10 11.9736H3C2.58579 11.9736 2.25 11.6378 2.25 11.2236ZM2.25 16.2236C2.25 15.8094 2.58579 15.4736 3 15.4736H10C10.4142 15.4736 10.75 15.8094 10.75 16.2236C10.75 16.6378 10.4142 16.9736 10 16.9736H3C2.58579 16.9736 2.25 16.6378 2.25 16.2236Z" fill="#F0F0F0"/>
						<path d="M19.125 10.9088C20.767 11.8568 21.588 12.3308 21.8478 12.958C22.0507 13.4481 22.0507 13.9987 21.8478 14.4888C21.588 15.116 20.767 15.59 19.125 16.538C17.483 17.486 16.662 17.96 15.9889 17.8714C15.4631 17.8021 14.9862 17.5268 14.6633 17.106C14.25 16.5674 14.25 15.6194 14.25 13.7234C14.25 11.8274 14.25 10.8794 14.6633 10.3408C14.9862 9.91999 15.4631 9.64468 15.9889 9.57545C16.662 9.48683 17.483 9.96083 19.125 10.9088Z" fill="#F0F0F0"/>
					</svg>
					<p className={styles.itemName}>Створити плейлист</p>
				</NavLink>
				<div className={`${styles.menuItem} ${styles.myPlaylistsItem}`}>
					<NavLink to="/mediateka#playlists">
						<p className={styles.itemNamePlaylists}>Ваші плейлисти</p>
					</NavLink>
					<svg onClick={toggleDropdown} width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.75 1.84375H16M4.75 7H16M4.75 12.1562H16M1 1.84375H1.9375M1 7H1.9375M1 12.1562H1.9375" stroke="#86AECA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					{showDropdown && (
						<div className={styles.dropdown} ref={dropdownRef}>
							<div
								className={`${styles.option} ${filterSelected === "default" ? styles.filterActive : ""}`}
								onClick={(e) => handleSelect("default", e)}
							>
								Нещодавно слухали
							</div>
							<div
								className={`${styles.option} ${filterSelected === "alphabet" ? styles.filterActive : ""}`}
								onClick={(e) => handleSelect("alphabet", e)}
							>
								За алфавітом
							</div>
						</div>
					)}
				</div>
				{sortedPlaylists?.map((playlist, index) => (
					<div className={styles.playlistItem}  key={index}>
						<img className={styles.playlistCover} src={playlist.coverUrl?.url || defaultCover} alt="playlistImg" />
						<p className={styles.playlistName}>{playlist.name}</p>
					</div>
				))}
			</nav>
		</aside>
	);
};
  
export default Sidebar;