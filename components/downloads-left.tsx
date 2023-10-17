import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function DownloadsLeft({
	downloadCount = 0,
}: {
	downloadCount: number;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className="rounded-full border-4 w-8 h-8 flex items-center justify-center font-bold text-sm">
						{downloadCount}
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Downloads Left</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
