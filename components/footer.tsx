const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Polly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;