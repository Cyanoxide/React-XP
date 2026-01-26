import styles from "./StartMenu.module.scss";

const StartMenu = () => {
    const onClickHandler = () => {

    }

    return (
        <div className={`${styles.startMenu} bg-[#3e75d8] absolute left-0 bottom-12`}>
            <header className="flex p-3">
                <img className="mr-2" width="50" height="50" />
                <h1>User</h1>
            </header>
            <main className="flex">
                <section className="bg-white text-[#373738] flex flex-col justify-between w-1/2 p-3">
                    <div>
                        <ul>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <span>
                                    <h5 className="font-bold">Internet</h5>
                                    <p>Internet Explorer</p>
                                </span>
                            </li>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <span>
                                    <h5 className="font-bold">E-mail</h5>
                                    <p>Outlook Express</p>
                                </span>
                            </li>
                        </ul>
                        <ul>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <h5>Windows Messenger</h5>
                            </li>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <h5>MSN</h5>
                            </li>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <h5>Windows Media Player</h5>
                            </li>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <h5>Tour Windows XP</h5>
                            </li>
                            <li className="flex p-2 items-center">
                                <img className="mr-2" width="22" height="22" />
                                <h5>Files and Settings Transfer Wizard</h5>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-2">
                            <h5>All Programs</h5>
                            <img className="mr-2" width="22" height="22" />
                        </div>
                    </div>
                </section>
                <section className="bg-[#d6e4f8] text-[#112366] w-1/2 p-2">
                    <ul>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>My Documents</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>My Recent Documents</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>My Pictures</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>My Music</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>My Computer</h5>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>Control Panel</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>Set Program Access and Defaults</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>Printers and Faxes</h5>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>Help and Support</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>Search</h5>
                        </li>
                        <li className="flex p-2 items-center">
                            <img className="mr-2" width="22" height="22" />
                            <h5>Run...</h5>
                        </li>
                    </ul>
                </section>
            </main>
            <footer>
                <ul className="flex justify-end gap-2 p-2">
                    <li className="flex">
                        <img className="mr-2" width="22" height="22" />
                        <h6>Log Off</h6>
                    </li>
                    <li className="flex">
                        <img className="mr-2" width="22" height="22" />
                        <h6>Turn Off Computer</h6>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

export default StartMenu;