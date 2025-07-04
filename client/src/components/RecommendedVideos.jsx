export default function RecommendedVideos() {
    return (
        <div className="max-w-72 px-2 bg-red-40">
            <h3 className="text-xs mb-2">Videos recommended</h3>
            <div className="space-y-2">
                <div className="flex gap-1">
                    <div className="w-36 h-20 bg-gray-300 rounded-md"></div>
                    <div>
                        <h2 className="text-xs">Video title here</h2>
                        <div className="mt-1">
                            <div className="text-[0.6rem] text-gray-400">Channel name</div>
                            <div className="text-[0.6rem] text-gray-400">1.5M views · 2 months ago</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}