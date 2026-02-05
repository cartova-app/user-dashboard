interface PageHeadingProps {
  heading: string;
  description?: string;
}

const PageHeading = ({ heading, description }: PageHeadingProps) => {
  return (
    <div className="space-y-2">
      <h1 className="font-['Anton'] font-normal not-italic text-[28px] leading-[34px] tracking-normal">
        {heading}
      </h1>
      {description && (
        <p className="text-[#494949] font-satoshi text-base font-normal leading-6">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeading;
