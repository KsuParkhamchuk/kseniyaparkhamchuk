import GridBox from "../_components/gridBox/GridBox";
import styles from "./page.module.css";

export default function FavouritesPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Collections</h2>
      <div className={styles.grid}>
        <GridBox
          title="Questions"
          href="https://www.notion.so/Questions-raw-271cca051c3a8028adc5f7dfa0d8f7fd?source=copy_link"
          external={true}
        />
        <GridBox
          title="Reading list"
          href="https://www.notion.so/17ce6204fb894f3b8fdd63b7ad5e34f6?v=d930275727434031a80a9c89b419f7d0&source=copy_link"
          external={true}
        />
        <GridBox title="Photos" href="/photos" />
      </div>
    </div>
  );
}
