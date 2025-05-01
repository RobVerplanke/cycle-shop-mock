function GoogleMap() {
  return (
    <section>
      <div className="google-map">
        <iframe
          className="google-map__iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6708.500819651096!2d-76.99896113221833!3d38.88703171692933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b831784f40a1%3A0x203125b243b354c2!2s212%207th%20St%20SE%20212%207th%2C%20Washington%2C%20DC%2020003%2C%20Verenigde%20Staten!5e0!3m2!1snl!2snl!4v1745949347808!5m2!1snl!2snl"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default GoogleMap;
